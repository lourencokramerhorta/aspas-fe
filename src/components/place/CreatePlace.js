import React, { Component } from "react";
import PlaceService from "./place-service";
import placeImage from "../images/create-place.svg";
import FileService from "../file-upload/file-upload-service";

export default class CreatePlace extends Component {
  state = {
    name: "",
    description: "",
    imageUrl: "",
    loading: false,
  };
  service = new PlaceService();
  FileService = new FileService();

  handleFileUpload = (e) => {
    this.setState({ loading: true });
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);

    this.FileService.handleUpload(uploadData)
      .then((response) => {
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        console.log("response is: ", response.secure_url);
        this.setState({ loading: false, imageUrl: response.secure_url });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const name = this.state.name;
    const description = this.state.description;
    const imageUrl = this.state.imageUrl;

    console.log("the imageUrl", imageUrl);

    this.service
      .createPlace(name, description, imageUrl)
      .then((response) => {
        this.setState({ name: "", description: "", imageUrl: "" });
        console.log("created place", response);
        this.props.history.push("/user-profile");
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
          <img src={placeImage} alt="placeImg" className="w-25" />
        </div>
        <div className=" d-flex align-items-center justify-content-center">
          <div className=" bg-light p-5 shadow">
            <form
              onSubmit={this.handleFormSubmit}
              className="d-flex flex-column"
              encType="multipart/form-data"
            >
              <label>Place Name</label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={(e) => this.handleChange(e)}
              />
              <label className="mt-3">description</label>
              <input
                type="text"
                name="description"
                value={this.state.description}
                onChange={(e) => this.handleChange(e)}
              />
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
            </form>
          </div>
        </div>
      </div>
    );
  }
}
