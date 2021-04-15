import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PlaceService from "./place-service";

export default class CreatePlace extends Component {
  service = new PlaceService();

  createNewPlace = async () => {
    const response = await this.service.createPlace();
    console.log("new place", response);
  };
  render() {
    return (
      <Link to={"/"} onClick={() => this.createNewPlace()}>
        create place
      </Link>
    );
  }
}
