import React, { Component } from "react";
import UserService from "./user-service";
import BookService from "../books/book-service";
import PlaceService from "../place/place-service";
import FileService from "../file-upload/file-upload-service";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import SearchBookCard from "../books/SearchBookCard";
import Transaction from "../transactions/Transaction";
import transitionGold from "../images/transition gold.png";
import UserTabs from "./UserTabs";

export default class UserProfile extends Component {
  state = {
    pickedBook: {},
    profileUser: {},
    tab: "books",
  };
  service = new UserService();
  bookService = new BookService();
  placeService = new PlaceService();
  fileService = new FileService();

  setTab = (tab) => {
    this.setState({ tab: tab });
  };

  getUserById = async () => {
    const { id } = this.props.match.params;
    const user = await this.service.setTheUser(id);
    this.setState({ profileUser: user });
    console.log("here");
  };

  setProfileUser = (user) => {
    this.setState({ profileUser: user });
  };

  pickBook = (theBook) => {
    this.setState({ pickedBook: [theBook] });
    console.log("theBook", theBook);
  };

  componentDidMount() {
    this.getUserById();
  }

  /*  componentDidUpdate() {
    this.getUserById();
  } */

  render() {
    const { profileUser } = this.state;
    const isOwnProfile =
      profileUser &&
      this.props.loggedInUser &&
      profileUser._id === this.props.loggedInUser._id;
    return (
      <div>
        <div className="shadow p-5 bg-golden rounded mt-5 ">
          <div className="d-flex align-items-start align-items-stretch">
            <div className="col-4">
              <img
                alt="transaction"
                src={profileUser.imageUrl}
                className="rounded-3 w-100 shadow"
              />
            </div>
            <h1 className="userCardText text-white">{profileUser.username}</h1>
            <div className="col-8 d-flex flex-column align-content-end mt-auto">
              <div className=" align-self-end">
                {isOwnProfile && (
                  <div>
                    <Link
                      to="/create-place"
                      className="me-3 btn btn-home-library"
                    >
                      Create Place
                    </Link>

                    <Link
                      to={`/user/${this.props.loggedInUser._id}/edit`}
                      className="me-3 btn btn-home-library"
                    >
                      edit profile
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <img src={transitionGold} alt="transaction" className="w-100" />
        <div className="container">
          <UserTabs setTab={this.setTab} tab={this.state.tab} />
          {this.state.tab === "places" && (
            <div>
              {/* <img src={ profileUser.photo}/> */}
              <h5>{profileUser.username}'s places:</h5>
              {profileUser.places &&
                profileUser.places.map((place) => {
                  return (
                    <Link
                      to={`/place-profile/${place._id}`}
                      key={place._id}
                      className="btn btn-outline-dark m-2"
                    >
                      {place.name}
                    </Link>
                  );
                })}
            </div>
          )}
          {this.state.tab === "books" && (
            <div>
              <h5>{profileUser.username}'s books:</h5>
              <div className="container-fluid">
                <div className="row">
                  {profileUser.books &&
                    profileUser.books.map((book) => {
                      return (
                        <SearchBookCard
                          key={book._id}
                          setProfileUser={this.setProfileUser}
                          setTheUser={this.props.setTheUser}
                          loggedInUser={this.props.loggedInUser}
                          pickBook={this.pickBook}
                          book={book}
                        />
                      );
                    })}
                </div>
              </div>
              {this.state.pickedBook.length >= 1 && (
                <Transaction
                  user2={profileUser}
                  loggedInUser={this.props.loggedInUser}
                  pickedBook={this.state.pickedBook}
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
