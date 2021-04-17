import React, { Component } from "react";
import UserService from "./user-service";
import BookService from "../books/book-service";
import PlaceService from "../place/place-service";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import SearchBookCard from "../books/SearchBookCard";

export default class UserProfile extends Component {
  state = {};
  service = new UserService();
  bookService = new BookService();
  placeService = new PlaceService();

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const { id } = this.props.match.params;
    const user = await this.service.getTheUser(id);
    console.log("user ==========>", user);
    // const place = this.placeService.getThePlace(user.places);
    this.setState(user);
  };

  setUser = (user) => {
    this.setState(user);
    this.props.getUser(user);
  };

  findPlace = async () => {
    const { userId } = this.props.params;
    const place = await this.placeService.getThePlace();
  };

  render() {
    return (
      <div>
        <Link to="/create-place">Create Place</Link>
        <h3>{this.state.username}</h3>

        <h5>{this.state.username}'s palces:</h5>
        {this.state.places &&
          this.state.places.map((place) => {
            return <Link to={`/place-profile/${place._id}`}>{place.name}</Link>;
          })}
        <h5>{this.state.username}'s books:</h5>
        <ul>
          {this.state.books &&
            this.state.books.map((book) => {
              return (
                <SearchBookCard
                  key={book.cover_i}
                  {...book}
                  setUser={this.setUser}
                  loggedInUser={this.props.loggedInUser}
                />
              );
            })}
        </ul>
      </div>
    );
  }
}
