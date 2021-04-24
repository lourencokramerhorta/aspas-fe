// components/projects/ProjectList.js

import React, { Component } from "react";
import axios from "axios";
import SearchBookCard from "./SearchBookCard";
import bookListImg from "../images/book list.svg";
import transition from "../images/transition.png";

/* import AddProject from "./AddProject"; // <== !!! */

class BookList extends Component {
  state = { listOfBooks: [] };

  // METER ISTO NO SERVICO!!!!!
  getAllBooksInDB = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/books-list`).then((responseFromApi) => {
      this.setState({
        listOfBooks: responseFromApi.data,
      });
    });
  };

  componentDidMount() {
    this.getAllBooksInDB();
  }

  render() {
    return (
      <div>
        <div>
          <div className="container-fluid bg-deep-blue">
            <div className="d-flex justify-content-center align-items-center mt-5 p-5">
              <img src={bookListImg} className="w-25 d-flex" />
              <div className="ms-5">
                <h1 className="mt-3 text-white fw-bolder">Our Library!</h1>
                <p className="text-white fs-5">
                  “The Pessimist Sees Difficulty In Every Opportunity. The
                  Optimist Sees Opportunity In Every Difficulty.” – Winston
                  Churchill
                </p>
                <div className="text-white d-flex align-items-end"></div>
              </div>
            </div>
          </div>
          <div className="">
            <img src={transition} className="position-relative w-100" />
          </div>
          <div className="container">
            <div className="row">
              <div></div>
              {this.state.listOfBooks.map((book) => {
                return (
                  <SearchBookCard
                    key={book._id}
                    setTheUser={this.props.setTheUser}
                    loggedInUser={this.props.loggedInUser}
                    book={book}
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

export default BookList;
