import React, { Component } from "react";
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
      console.log(response);
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
      <div className="container mt-5 pt-5">
        <form onSubmit={this.handleFormSubmit}>
          <div className="d-flex justify-content-center my-3">
            <div>
              <input
                className="form-control"
                type="text"
                name="search"
                value={this.state.search}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <div className="">
              <button
                type="submit"
                className={`btn btn-outline-dark align-self-center ${
                  this.state.loading ? "disabled" : ""
                }`}
              >
                {this.state.loading ? (
                  <div>
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    &nbsp;Loading...
                  </div>
                ) : (
                  <span>SEARCH</span>
                )}
              </button>
            </div>
          </div>
        </form>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-outline-dark"
            onClick={() => this.setState({ page: this.state.page - 1 })}
          >
            Prev
          </button>
          <button
            className="btn btn-outline-dark"
            onClick={() => this.setState({ page: this.state.page + 1 })}
          >
            Next
          </button>
        </div>
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
