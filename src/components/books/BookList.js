// components/projects/ProjectList.js

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBookCard from "./SearchBookCard";
import CreatePlace from "../place/CreatePlace";

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
        <CreatePlace />
        <ul>
          <Link to="/search">Search</Link>
          <div style={{ width: "60%", float: "left" }}>
            {this.state.listOfBooks.map((book) => {
              return <SearchBookCard key={book.cover_i} {...book} />;
            })}
          </div>
        </ul>
      </div>
    );
  }
}

export default BookList;
