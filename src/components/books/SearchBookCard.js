import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddBook from "./AddBook";

export default class SearchBookCard extends Component {
  isbnOrKey = () => {
    if (this.props.isbn) {
      return this.props.isbn[0];
    } else {
      return this.props.edition_key[0];
    }
  };

  render() {
    return (
      <li>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={`http://covers.openlibrary.org/b/id/${this.props.cover_i}-M.jpg`}
            className="card-img-top"
            alt="book cover"
          />
          <div className="card-body">
            <h5 className="card-title">{this.props.title}</h5>
            <p className="card-text">
              first published: {this.props.first_publish_year}
            </p>
            <Link
              to={`/book-profile/${this.isbnOrKey()}`}
              className="btn btn-primary"
            >
              See more
            </Link>
            <AddBook
              book={this.props}
              setUser={this.props.setUser}
              loggedInUser={this.props.loggedInUser}
            />
          </div>
        </div>
      </li>
    );
  }
}
