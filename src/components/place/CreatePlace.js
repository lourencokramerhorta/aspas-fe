import React, { Component } from "react";
import PlaceService from "./place-service";
import placeImage from "../images/create-place.svg";

export default class CreatePlace extends Component {
  state = {
    name: "",
    description: "",
  };
  service = new PlaceService();

  handleFormSubmit = (event) => {
    event.preventDefault();
    const name = this.state.name;
    const description = this.state.description;
    this.service
      .createPlace(name, description)
      .then((response) => {
        this.setState({ name: "", description: "" });
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
              <button
                className="btn-home-community mt-4 border-0"
                type="submit"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
