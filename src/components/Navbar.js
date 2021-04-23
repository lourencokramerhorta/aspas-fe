import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import AuthService from "./auth/auth-service";


class Navbar extends Component {
  service = new AuthService();

  logoutUser = () => {
    this.service.logout().then(() => {
      this.props.logoutTheUser();
    });
  };

  render() {
    return (
      <nav className="nav-style">
        <ul>
          {this.props.loggedInUser && (
            <Fragment>
              <Link to={`/user/${this.props.loggedInUser._id}`}>
                <li>Welcome, {this.props.loggedInUser.username}</li>
              </Link>
              <li>
                <Link to="/book-list" style={{ textDecoration: "none" }}>
                  books
                </Link>
              </li>
              <li>
                <Link to="/user-list" style={{ textDecoration: "none" }}>
                  users
                </Link>
              </li>
              <li>
                <button herf="/book-list" onClick={() => this.logoutUser()}>
                  Logout
                </button>
              </li>
            </Fragment>
          )}
          {!this.props.loggedInUser && (
            <Fragment>
              <li>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  Signup
                </Link>
              </li>
              <li>
                <Link to="/sign-in" style={{ textDecoration: "none" }}>
                  Signin
                </Link>
              </li>
            </Fragment>
          )}
          <Link to="/search/abc">Search</Link>
        </ul>
      </nav>
    );
  }
}
export default Navbar;
