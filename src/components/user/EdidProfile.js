import React, { Component } from "react";
import UserService from "./user-service";
import FileService from "../file-upload/file-upload-service";
import editUser from "../images/edit-user.svg";

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
      <div className="create-place pt-5">
        <div className="d-flex m-5 justify-content-center align-items-center">
          <img src={editUser} alt="editUser" className="w-25" />
        </div>
        <div className="d-flex m-5 justify-content-center align-items-center">
          <div className=" d-flex align-items-center justify-content-center">
            <div className=" bg-light p-5 shadow">
              <form
                onSubmit={this.handleFormSubmit}
                enctype="multipart/form-data"
                className="form-group"
              >
                <div class="d-flex flex-column bd-highlight">
                  <div class="form-group  align-self-center">
                    <label for=" username">Username:</label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      value={this.state.username}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="my-3"
                      type="file"
                      onChange={(e) => this.handleFileUpload(e)}
                    />
                  </div>
                  <button
                    type="submit"
                    class={`btn-home-community mt-3 border-0 p-2 align-self-center ${
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
