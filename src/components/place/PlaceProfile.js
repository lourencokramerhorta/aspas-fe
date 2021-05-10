import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import transition from "../images/transition.png";
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
      <div>
        {this.state.place && (
          <div>
            <div className="shadow p-5 bg-deep-blue rounded mt-5 ">
              <div className="d-flex align-items-start align-items-stretch">
                <div className="col-5">
                  <img
                    alt="userprofile"
                    src={this.state.place.imageUrl}
                    className="rounded-3 w-75 shadow"
                  />
                </div>
                <h1 className="userCardText text-white">
                  {this.state.place.name}
                </h1>
                <p className="userCardText text-white pt-5 mt-5">
                  {this.state.place.description}
                </p>
                <div className="col-7 d-flex flex-column align-content-end mt-auto">
                  <div className=" align-self-end">
                    <div>
                      <Link
                        to={`/place/${this.state.place._id}/edit`}
                        className="me-3 btn btn-home-community"
                      >
                        edit palce
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <img src={transition} alt="transaction" className="w-100" />
          </div>
        )}
      </div>
    );
    /* return (
      <div className="mt-5 pt-5">
        {this.state.place && (
          <div>
            <p>{this.state.place.name}</p>
            <img src={this.state.place.imageUrl} alt="place" className="w-50" />
          </div>
        )}
      </div>
    ); */
  }
}
