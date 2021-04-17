import React, { Component } from "react";
import axios from "axios";
import SearchBookCard from "./SearchBookCard";
import OpenLibraryService from "./openlibrary-service";

export default class SearchBooks extends Component {
  state = {
    search: this.props.match.params.query,
    booksFromAPI: [],
    loading: false,
    page: 1,
  };

  service = new OpenLibraryService();

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    this.service.search(this.state.search).then((response) => {
      this.setState({
        booksFromAPI: response.docs,
        loading: false,
      });
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handlePages = () => {
    this.setState({ page: this.state.page + 1 });
  };

  componentDidMount() {
    this.props.resetSearch();
    if (this.state.search.length > 0) {
      this.setState({ loading: true });
      this.service.search(this.state.search).then((response) => {
        this.setState({
          booksFromAPI: response.docs,
          loading: false,
        });
      });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            name="search"
            value={this.state.search}
            onChange={(e) => this.handleChange(e)}
          />
          <input type="submit" value="search" />
        </form>
        {this.state.loading && <div>loading...</div>}
        <button onClick={() => this.setState({ page: this.state.page - 1 })}>
          Back
        </button>
        <button onClick={() => this.setState({ page: this.state.page + 1 })}>
          Next
        </button>
        <div className="container-fluid">
          <div className="row">
            {this.state.booksFromAPI
              .slice(10 * (this.state.page - 1), 10 * this.state.page)
              .map((book) => {
                return <SearchBookCard key={book.cover_i} book={book} />;
              })}
          </div>
        </div>
      </div>
    );
  }
}
