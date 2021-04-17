import React, { Component } from "react";
import axios from "axios";
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
            <button onClick={() => this.props.pickBook(this.props.book)}>
              ask for transaction
            </button>
            <button onClick={() => this.addBookToCollection(this.props.book)}>
              Add Book to Collection
            </button>
          </div>
        )}
        {hasBook && (
          <button
            onClick={() => this.removeBookFromCollection(this.props.book)}
          >
            remove book from Collection
          </button>
        )}
      </div>
    );
  }
}
