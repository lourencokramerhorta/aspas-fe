import React, { Component } from "react";
import axios from "axios";
/* import { Link } from "react-router-dom"; */

export default class SearchBooks extends Component {
  state = {
    search: "",
    booksFromAPI: [],
    loading: false,
    page: 1,
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    axios
      .get(`http://openlibrary.org/search.json?title=${this.state.search}`)
      .then((response) => {
        console.log(response.data.docs);
        this.setState({ booksFromAPI: response.data.docs, loading: false });
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handlePages = () => {
    this.setState({ page: this.state.page + 1 });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Search</label>
          <input
            type="text"
            name="search"
            value={this.state.search}
            onChange={(e) => this.handleChange(e)}
          />
          <input type="submit" value="search" />
        </form>
        {this.state.loading && <div>loading...</div>}
        <ul>
          <button onClick={() => this.setState({ page: this.state.page + 1 })}>
            Next
          </button>
          {this.state.booksFromAPI
            .slice(10 * (this.state.page - 1), 10 * this.state.page)
            .map((book) => {
              return (
                <li>
                  {book.title}
                  <img
                    src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  />
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
