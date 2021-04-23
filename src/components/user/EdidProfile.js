import React, { Component } from "react";
import UserService from "./user-service";
import FileService from "../file-upload/file-upload-service";

export default class EdidProfile extends Component {
  state = {
    username: this.props.loggedInUser.username,
    imageUrl: "",
    loading: false,
  };

  UserService = new UserService();
  FileService = new FileService();

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const editedUser = await this.UserService.editUserProfile(
      this.props.loggedInUser,
      {
        username: this.state.username,
        imageUrl: this.state.imageUrl,
      }
    );
    this.props.setTheUser(editedUser);
    this.props.history.push(`/user/${this.props.loggedInUser._id}`);
  };

  handleFileUpload = (e) => {
    this.setState({ loading: true });
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);

    this.FileService.handleUpload(uploadData)
      .then((response) => {
        console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ loading: false, imageUrl: response.secure_url });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
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

          <input type="file" onChange={(e) => this.handleFileUpload(e)} />
          <button
            type="submit"
            class={`btn btn-warning align-self-center ${
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
              <span>Confirm</span>
            )}
          </button>
        </div>
      </form>
    );
  }
}
