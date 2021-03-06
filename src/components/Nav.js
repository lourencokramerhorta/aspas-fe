import React, { Component, Fragment } from "react";
import AuthService from "./auth/auth-service";
import { Link } from "react-router-dom";
import logo from "./images/left-quote.svg";
import logout from "./images/logout.svg";

export default class Nav extends Component {
  state = { search: "", showSearch: true };
  service = new AuthService();

  logoutUser = () => {
    this.service.logout().then(() => {
      this.props.logoutTheUser();
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.submitSearch();
    this.props.history.push(`/search/${this.state.search}`);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    this.setState({
      showSearch: !this.props.location.pathname.includes("/search/"),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        showSearch: !this.props.location.pathname.includes("/search/"),
      });
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top">
        <div className="container ">
          <Link
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </Link>
          <Link to="/" className="nav-link">
            <img border="0" alt="user" src={logo} width="30" />
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active text-deep-blue"
                  aria-current="page"
                  to="/book-list"
                >
                  Library
                </Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link text-deep-blue" to="/user-list">
                  Readers
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-deep-blue" to="/trade-list">
                  Market
                </Link>
              </li>
            </ul>
            {this.state.showSearch && (
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
              </form>
            )}
            {this.props.loggedInUser && (
              <Fragment>
                <Link
                  to={`/user/${this.props.loggedInUser._id}`}
                  className="nav-link"
                >
                  <div
                    style={{
                      backgroundImage:
                        "url(" + this.props.loggedInUser.imageUrl + ")",
                      width: "40px",
                      height: "40px",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  ></div>
                </Link>
                <Link
                  to="/"
                  onClick={() => this.logoutUser()}
                  className="nav-link"
                >
                  <img border="" alt="user" src={logout} width="28" />
                </Link>
              </Fragment>
            )}
            {!this.props.loggedInUser && (
              <Fragment>
                <Link
                  to="/signup"
                  className="btn btn-outline-light me-2"
                  style={{ textDecoration: "none" }}
                >
                  Signup
                </Link>
                <Link
                  to="/sign-in"
                  className="btn btn-outline-light"
                  style={{ textDecoration: "none" }}
                >
                  Signin
                </Link>
              </Fragment>
            )}
          </div>
        </div>
      </nav>
    );
  }
}
