import React, { Component } from "react";
import UserService from "./user-service";
import BookService from "../books/book-service";
import PlaceService from "../place/place-service";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import SearchBookCard from "../books/SearchBookCard";
import Transaction from "./Transaction";

export default class UserProfile extends Component {
  state = {
    pickedBook: {},
    profileUser: {},
  };
  service = new UserService();
  bookService = new BookService();
  placeService = new PlaceService();

  getUserById = async () => {
    const { id } = this.props.match.params;
    const user = await this.service.setTheUser(id);
    this.setState({ profileUser: user });
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

  componentDidUpdate() {
    this.getUserById();
  }

  render() {
    const { profileUser } = this.state;
    const isOwnProfile =
      profileUser &&
      this.props.loggedInUser &&
      profileUser._id === this.props.loggedInUser._id;
    return (
      <div>
        <Link to="/create-place">Create Place</Link>
        <h3>{profileUser.username}</h3>

        <h5>{profileUser.username}'s places:</h5>
        {profileUser.places &&
          profileUser.places.map((place) => {
            return <Link to={`/place-profile/${place._id}`}>{place.name}</Link>;
          })}
        <h5>{profileUser.username}'s books:</h5>
        <div className="container">
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
        {this.state.pickedBook.length >= 1 && (
          <Transaction
            user2={profileUser}
            loggedInUser={this.props.loggedInUser}
            pickedBook={this.state.pickedBook}
          />
        )}
      </div>
    );
  }
}
