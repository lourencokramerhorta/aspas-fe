import React, { Component } from "react";
import AuthService from "./auth/auth-service";
import { Link, Redirect } from "react-router-dom";

export default class Nav extends Component {
  state = { search: "" };
  service = new AuthService();

  logoutUser = () => {
    this.service.logout().then(() => {
      this.props.logoutTheUser();
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.submitSearch();
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    if (this.props.searchSubmitted)
      return (
        <Redirect
          to={{
            pathname: `/search/${this.state.search}`,
          }}
        />
      );
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="/">
            Aspas"
          </a>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/book-list"
                >
                  Library
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/user-list">
                  Readers
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Market
                </a>
              </li>
            </ul>
            <form className="d-flex" onSubmit={this.handleFormSubmit}>
              <input
                onChange={this.handleChange}
                className="form-control me-2"
                type="search"
                name="search"
                placeholder="Search"
                aria-label="Search"
                value={this.state.search}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
              {this.props.loggedInUser && (
                <Link
                  to={`/user/${this.props.loggedInUser._id}`}
                  className="nav-link"
                >
                  <img
                    border="0"
                    alt="user photo"
                    src="https://ca-times.brightspotcdn.com/dims4/default/3f64be7/2147483647/strip/true/crop/2048x1152+0+0/resize/840x473!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F6c%2F1d%2F2f708b6be69d04afa75cb22b81eb%2Fla-sgreene-1481324218-snap-photo"
                    width="30"
                    height="30"
                    className="shadow rounded"
                  />
                </Link>
              )}
            </form>
          </div>
        </div>
      </nav>
    );
  }
}
