import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import community from "./images/community.svg";
import library from "./images/library.svg";
import places from "./images/place.svg";
import transition from "./images/transition.png";
import transitionWhite from "./images/transition white.png";

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid bg-deep-blue">
          <div className="d-flex justify-content-center align-items-center mt-5 p-5">
            <img src={community} alt="community" className=" w-50 p-5" />
            <div className="ms-5">
              <h1 className="mt-3 text-white fw-bolder">Join our community!</h1>
              <p className="text-white fs-5">
                We are a group of people that love to read and share our
                thoughts, join our website to participate in this movement.
              </p>
              <div className="text-white d-flex align-items-end">
                <Link to="/sign-in" className="btn btn-home-community mt-3">
                  Sign up
                </Link>
                <span className="mb-2 ms-2">or</span>
                <Link to="/sign-in" className="btn btn-link mt-3 text-white">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <img
            src={transition}
            alt="transaction"
            className="position-relative w-100"
          />
        </div>
        <div className="container-fluid">
          <div className="d-flex justify-content-center align-items-center p-5">
            <div className="ms-5">
              <h1 className="mt-3 deep-blue-text fw-bolder">
                Explore our user's library!
              </h1>
              <p className="deep-blue-text fs-5">
                Check witch books your friends have and check ask them if they
                want to trade!
              </p>
              <Link to="/book-list" className="btn btn-home-library mt-3">
                Our Library
              </Link>
            </div>
            <img src={library} alt="library" className=" w-50 p-5" />
          </div>
        </div>
        <div className="container-fluid bg-golden p-0">
          <img src={transitionWhite} alt="transition" className="w-100" />
          <div className="d-flex justify-content-center align-items-center p-5">
            <img src={places} alt="wtf" className=" w-50 p-5" />
            <div className="ms-5">
              <h1 className="mt-3 text-white fw-bolder">
                Check places around you!
              </h1>
              <p className="text-white fs-5">
                Explore the places around you that have books that might intrest
                you!
              </p>
              <Link to="/book-list" className="btn btn-home-library mt-3">
                Our Places
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
