import React, { Component } from "react";
import BookListItem from "../books/BookListItem";

import transactionService from "./transaction-service";

export default class Transaction extends Component {
  state = { book1: this.props.pickedBook[0], book2: {} };

  transactionService = new transactionService();

  pickBook2 = (theBook2) => {
    this.setState({ book2: theBook2 });
  };

  makeATrade = async () => {
    const { book1, book2 } = this.state;
    let type = "user";

    const trade = await this.transactionService.makeTrade({
      book1: book1._id,
      book2: book2._id,
      profileUserId: this.props.user2._id,
      type,
    });
    console.log("trade", trade);
    console.log("profileUserId", this.props.user2);
  };

  render() {
    /* console.log("props", this.props); */
    const { user2, loggedInUser } = this.props;
    /* console.log("loggedInUser", loggedInUser); */
    console.log("book1", this.state.book1._id);
    console.log("book2", this.state.book2._id);
    return (
      <div className="container">
        <div className="d-flex align-items-center justify-content-between p-4 bg-white mb-4 shadow shadow-rounded">
          <div>
            <h4>{user2.username}</h4>
            <BookListItem
              book={this.state.book1}
              bookYouWant={true}
              loggedInUser={loggedInUser}
            />
          </div>
          <button className="my-5" onClick={() => this.makeATrade()}>
            MAKE TRADE
          </button>
          <div>
            <h4>{loggedInUser.username}</h4>
            <BookListItem
              book={this.state.book2}
              bookYouWant={true}
              loggedInUser={loggedInUser}
            />

            <div>
              <h4>{loggedInUser.username}</h4>
              {!this.state.book2 && <div>este Livro</div>}
              {loggedInUser.books.map((book) => {
                return (
                  <BookListItem
                    key={book._id}
                    book={book}
                    loggedInUser={loggedInUser}
                    pickBook2={this.pickBook2}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
