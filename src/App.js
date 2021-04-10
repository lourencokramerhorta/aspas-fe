import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import AuthService from "./components/auth/auth-service";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import BookList from "./components/BookList";
import Navbar from "./components/Navbar";
import SearchBooks from "./components/SearchBooks";

class App extends Component {
  state = { loggedInUser: null };

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

  setLoggedInUser = () => {
    this.setState({ loggedInUser: false });
  };

  getTheUser = (userObj) => {
    console.log("userObj", userObj);
    this.setState({
      loggedInUser: userObj,
    });
  };

  render() {
    this.fetchUser();
    return (
      <div className="App">
        <Navbar
          loggedInUser={this.state.loggedInUser}
          setLoggedInUser={this.setLoggedInUser}
        />
        <Switch>
          <Route exact path="/book-list" component={BookList} />
          <Route
            exact
            path="/signup"
            render={(props) => <Signup getUser={this.getTheUser} {...props} />}
          />
          <Route
            exact
            path="/sign-in"
            render={(props) => <Login getUser={this.getTheUser} {...props} />}
          />
          <SearchBooks path="/search" />
        </Switch>
      </div>
    );
  }
}
export default App;
