// components/projects/ProjectList.js

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBookCard from "./SearchBookCard";

/* import AddProject from "./AddProject"; // <== !!! */

class BookList extends Component {
  state = { listOfBooks: [] };

  // METER ISTO NO SERVICO!!!!!
  getAllBooksInDB = () => {
    axios.get(`http://localhost:5000/books-list`).then((responseFromApi) => {
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
      <div className="container-fluid">
        <div className="row">
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
    );
  }
}

export default BookList;
