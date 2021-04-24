import React, { Component } from "react";
import BookService from "./book-service";
import { Link } from "react-router-dom";

export default class AddBook extends Component {
  service = new BookService();

  updateUserEverywhere = (user) => {
    if (this.props.setProfileUser) {
      this.props.setProfileUser(user);
    }
    this.props.setTheUser(user);
  };

  addBookToCollection = async (book) => {
    const updatedUser = await this.service.findOrCreate(book);
    this.updateUserEverywhere(updatedUser);
  };

  removeBookFromCollection = async (book) => {
    const updatedUser = await this.service.removeBook(book._id);
    this.updateUserEverywhere(updatedUser);
  };

  render() {
    const hasBook =
      this.props.loggedInUser &&
      this.props.loggedInUser.books.some(
        (book) => book._id === this.props.book._id
      );
    return (
      <div>
        {!hasBook && (
          <div className="d-flex justify-content-around">
            <Link
              onClick={() => this.props.pickBook(this.props.book)}
              className="btn btn-home-places m-2 "
            >
              Trade
            </Link>
            <Link
              onClick={() => this.addBookToCollection(this.props.book)}
              className="btn btn-home-places m-2"
            >
              Add
            </Link>
          </div>
        )}
        {hasBook && (
          <div className="d-flex justify-content-around">
            <Link
              onClick={() => this.removeBookFromCollection(this.props.book)}
              className="btn btn-home-places m-2"
            >
              remove
            </Link>
          </div>
        )}
      </div>
    );
  }
}
