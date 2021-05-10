import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import AuthService from "./components/auth/auth-service";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import BookList from "./components/books/BookList";
import SearchBooks from "./components/books/SearchBooks";
import bookProfile from "./components/books/BookProfile";
import UserProfile from "./components/user/UserProfile";
import CreatePlace from "./components/place/CreatePlace";
import UserList from "./components/user/UserList";
import PlaceProfile from "./components/place/PlaceProfile";
import Nav from "./components/Nav";
import EditProfile from "./components/user/EdidProfile";
import Home from "./components/Home";
import TradeList from "./components/transactions/TradeList";

class App extends Component {
  state = { loggedInUser: null, searchSubmitted: false };

  service = new AuthService();

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then((response) => {
          this.setState({
            loggedInUser: response,
          });
        })
        .catch((err) => {
          this.setState({
            loggedInUser: false,
          });
        });
    }
  }

  resetSearch = () => {
    this.setState({ searchSubmitted: false });
  };

  submitSearch = () => {
    this.setState({ searchSubmitted: true });
  };

  logoutTheUser = () => {
    this.setState({ loggedInUser: false });
  };

  setTheUser = (userObj) => {
    console.log("userObj", userObj);
    this.setState({
      loggedInUser: userObj,
    });
  };

  render() {
    this.fetchUser();
    return (
      <div className="App">
        <Route
          path="*"
          render={(props) => (
            <Nav
              loggedInUser={this.state.loggedInUser}
              logoutTheUser={this.logoutTheUser}
              submitSearch={this.submitSearch}
              searchSubmitted={this.state.searchSubmitted}
              {...props}
            />
          )}
        />
        <Switch>
          <Route exact path="/book-profile/:isbn" component={bookProfile} />
          <Route exact path="/user-list" component={UserList} />
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/user/:id"
            render={(props) => (
              <UserProfile
                setTheUser={this.setTheUser}
                loggedInUser={this.state.loggedInUser}
                logoutTheUser={this.logoutTheUser}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/place-profile/:id"
            render={(props) => (
              <PlaceProfile
                setTheUser={this.setTheUser}
                loggedInUser={this.state.loggedInUser}
                logoutTheUser={this.logoutTheUser}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/user/:id/edit"
            render={(props) => (
              <EditProfile
                setTheUser={this.setTheUser}
                loggedInUser={this.state.loggedInUser}
                logoutTheUser={this.logoutTheUser}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/book-list"
            render={(props) => (
              <BookList
                setTheUser={this.setTheUser}
                loggedInUser={this.state.loggedInUser}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/trade-list"
            render={(props) => (
              <TradeList loggedInUser={this.state.loggedInUser} />
            )}
          />
          <Route
            exact
            path="/create-place"
            render={(props) => <CreatePlace {...props} />}
          />
          <Route
            exact
            path="/signup"
            render={(props) => <Signup getUser={this.setTheUser} {...props} />}
          />
          <Route
            exact
            path="/sign-in"
            render={(props) => <Login getUser={this.setTheUser} {...props} />}
          />
          <Route
            path="/search/:query"
            render={(props) => (
              <SearchBooks
                setTheUser={this.setTheUser}
                resetSearch={this.resetSearch}
                {...props}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
export default App;
