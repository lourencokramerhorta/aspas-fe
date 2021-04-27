import React, { Component } from "react";
import PlaceService from "./place-service";
export default class PlaceProfile extends Component {
  state = {};
  service = new PlaceService();

  componentDidMount() {
    this.getPlace();
  }

  getPlace = async () => {
    const { id } = this.props.match.params;
    const place = await this.service.getThePlace(id);
    console.log("place", place);
    this.setState({ place: place });
  };
  render() {
    return (
      <div className="mt-5 pt-5">
        {this.state.place && (
          <div>
            <p>{this.state.place.name}</p>
            <img src={this.state.place.imageUrl} alt="place" className="w-50" />
          </div>
        )}
      </div>
    );
  }
}
