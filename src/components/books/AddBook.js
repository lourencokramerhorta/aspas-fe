import React, { Component } from "react";
import axios from "axios";
import BookService from "./book-service";

export default class AddBook extends Component {
  service = new BookService();

  addBookToCollection = async (book) => {
    const response = await this.service.findOrCreate(book);
    console.log("addBookToCollection", response);
  };

  removeBookFromCollection = async (book) => {
    const res = await this.service.removeBook(book._id);
    this.props.setUser(res);
    console.log("remove book", res);
  };

  render() {
    const hasBook =
      this.props.loggedInUser &&
      this.props.loggedInUser.books.includes(this.props.book._id);
    return (
      <div>
        {!hasBook && (
          <button onClick={() => this.addBookToCollection(this.props.book)}>
            Add Book to Collection
          </button>
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
