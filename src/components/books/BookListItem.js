import React, { Component } from "react";

export default class BookListItem extends Component {
  render() {
    const { book } = this.props;
    return (
      <div>
        <h5>{book.title}</h5>
        <p>{book.author}</p>
        {!this.props.bookYouWant && (
          <button onClick={() => this.props.pickBook2(this.props.book)}>
            trade this book
          </button>
        )}
      </div>
    );
  }
}
