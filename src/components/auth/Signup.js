import React, { Component } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";
import signupImg from "../images/signin Img.svg";
class Signup extends Component {
  state = { username: "", password: "" };

  service = new AuthService();

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    console.log(username, password);
    this.service
      .signup(username, password)
      .then((response) => {
        this.setState({
          username: "",
          password: "",
        });
        this.props.getUser(response);
      })
      .catch((error) => console.log("hdjfkfk", error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="create-place pt-5">
        <div className="d-flex m-5 justify-content-center align-items-center">
          <img src={signupImg} alt="signupimg" className="w-25" />
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
                  type="submit"
                  value="Signup"
                  className="btn-home-community mt-4 border-0 mb-2"
                />
              </form>

              <p>
                Already have account?
                <Link to={"/sign-in"}> Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
