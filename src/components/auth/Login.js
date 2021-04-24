import React, { Component } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";
import loginImg from "../images/login img.svg";

class Login extends Component {
  state = { username: "", password: "" };

  service = new AuthService();

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service
      .login(username, password)
      .then((response) => {
        this.setState({ username: "", password: "" });
        console.log("resposta do passaport", response);
        this.props.getUser(response);
        this.props.history.push("/book-list");
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="create-place pt-5">
        <div className="d-flex m-5 justify-content-center align-items-center">
          <img src={loginImg} className="w-25" />
        </div>
        <div className="d-flex m-5 justify-content-center align-items-center">
          <div className=" d-flex align-items-center justify-content-center">
            <div className=" bg-light p-5 shadow">
              <form
                onSubmit={this.handleFormSubmit}
                className="d-flex flex-column"
              >
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={(e) => this.handleChange(e)}
                />
                <label>Password:</label>
                <input
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={(e) => this.handleChange(e)}
                />

                <input
                  className="btn-home-community mt-4 border-0 mb-2"
                  type="submit"
                  value="Login"
                />
              </form>
              <p>
                Don't have account?
                <Link to={"/signup"}> Signup</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
