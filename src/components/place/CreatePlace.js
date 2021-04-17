import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PlaceService from "./place-service";

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
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Place Name</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={(e) => this.handleChange(e)}
          />
          <label>description</label>
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={(e) => this.handleChange(e)}
          />
          <input type="submit" value="Create" />
        </form>
      </div>
    );
  }
}
