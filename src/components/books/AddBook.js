import React, { Component } from "react";
import BookService from "./book-service";

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
          <div>
            <button
              onClick={() => this.props.pickBook(this.props.book)}
              className="btn btn-outline-dark mt-2"
            >
              ask for transaction
            </button>
            <button
              onClick={() => this.addBookToCollection(this.props.book)}
              className="btn btn-outline-dark mt-2"
            >
              Add Book to Collection
            </button>
          </div>
        )}
        {hasBook && (
          <button
            onClick={() => this.removeBookFromCollection(this.props.book)}
            className="btn btn-outline-dark mt-2"
          >
            remove book from Collection
          </button>
        )}
      </div>
    );
  }
}
