import React, { Component } from "react";
import UserService from "./user-service";
export default class EdidProfile extends Component {
  state = {
    username: this.props.loggedInUser.username,
  };

  service = new UserService();

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.service.editUserProfile(this.props.loggedInUser, {
      username: this.state.username,
    });
    this.props.history.push(`/user/${this.props.loggedInUser._id}`);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit} enctype="multipart/form-data">
        <div class="d-flex flex-column bd-highlight mb-3 pt-5">
          <div class="p-2 bd-highlight align-self-center">
            <label for=" username">Username:</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={(e) => this.handleChange(e)}
            />
          </div>

          <button type="submit" class="btn btn-warning align-self-center">
            edit
          </button>
        </div>
      </form>
    );
  }
}
