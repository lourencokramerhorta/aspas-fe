import React, { Component } from "react";
import SearchBookCard from "../books/SearchBookCard";
export default class Transaction extends Component {
  state = {};
  render() {
    console.log("props", this.props);
    const { user2, pickedBook, loggedInUser } = this.props;
    return (
      <div>
        <div>
          <div>/////////////////////////////////////////</div>
          <div>New Transaction</div>
          <h4>{user2.username}</h4>
          <p>{pickedBook[0].title}</p>
          <p>{pickedBook[0].author}</p>
        </div>
        <div>
          <h4>{loggedInUser.username}</h4>
          {loggedInUser.books.map((book) => {
            <SearchBookCard
              key={book.cover_i}
              {...book}
              loggedInUser={loggedInUser}
              pickBook={pickedBook}
            />;
          })}
        </div>
      </div>
    );
  }
}
