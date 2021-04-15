import React, { Component } from "react";
import axios from "axios";
import BookService from "./book-service";

export default class AddBook extends Component {
  service = new BookService();

  addBookToCollection = async (book) => {
    const response = await this.service.findOrCreate(book);
    console.log("addBookToCollection", response);
  };

  render() {
    return (
      <button onClick={() => this.addBookToCollection(this.props.book)}>
        Add Book to Collection
      </button>
    );
  }
}
