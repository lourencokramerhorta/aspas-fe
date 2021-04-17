import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddBook from "./AddBook";

export default class SearchBookCard extends Component {
  isbnOrKey = (book) => {
    if (book.isbn) {
      return book.isbn[0];
    } else {
      return book.edition_key[0];
    }
  };

  render() {
    const { book } = this.props;
    if (!book) return <div></div>;
    return (
      <div className="col-3">
        <div className="card">
          <img
            src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
            className="card-img-top"
            alt="book cover"
          />
          <div className="card-body">
            <h5 className="card-title">{book.title}</h5>
            <p className="card-text">
              first published: {book.first_publish_year}
            </p>
            <Link
              to={`/book-profile/${this.isbnOrKey(book)}`}
              className="btn btn-primary"
            >
              See more
            </Link>
            <AddBook
              book={book}
              setProfileUser={this.props.setProfileUser}
              setTheUser={this.props.setTheUser}
              loggedInUser={this.props.loggedInUser}
              pickBook={this.props.pickBook}
            />
          </div>
        </div>
      </div>
    );
  }
}
