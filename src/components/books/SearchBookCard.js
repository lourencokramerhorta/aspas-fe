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
      <div className="col-6 col-md-6 col-lg-3 col-xl-3 col-xxl-3">
        <div className="card  mt-3 bg-light">
          {book.cover_i && (
            <img
              src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              className="card-img-top"
              alt="book cover"
            />
          )}
          {!book.cover_i && (
            <img
              className="rounded img-fluid"
              src={`https://images.theconversation.com/files/124616/original/image-20160531-1931-1u9i5fu.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=496&fit=clip`}
              alt="book cover"
            />
          )}

          <div className="container">
            <div className="card-body">
              <h5 className="card-title">{book.title}</h5>

              {book.author_name && <p>author: {book.author_name}</p>}
              {book.author && <p>author: {book.author}</p>}
            </div>
            <div className="container">
              <div className="d-flex justify-content-around ">
                <Link
                  to={`/book-profile/${this.isbnOrKey(book)}`}
                  className="btn btn-home-places m-2"
                >
                  See more
                </Link>
              </div>
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
      </div>
    );
  }
}
