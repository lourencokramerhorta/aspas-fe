// components/projects/ProjectList.js

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

/* import AddProject from "./AddProject"; // <== !!! */

class BookList extends Component {
  state = { listOfBooks: [] };

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
      <div>
        hey
        <div style={{ width: "60%", float: "left" }}>
          {this.state.listOfBooks.map((book) => {
            return (
              <div key={book._id}>
                <Link to={`/books/${book.isbn[0]}`}>
                  <h3>{book.title}</h3>
                </Link>
                <p>{book.author}</p>
                <p>{book.ganre}</p>
                <p style={{ maxWidth: "400px" }}>{book.description} </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default BookList;
