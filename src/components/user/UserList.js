import React, { Component } from "react";
import UserService from "./user-service";
import UserCard from "./UserCard";
import userListImg from "../images/user-list.svg";
import transition from "../images/transition.png";

export default class UserList extends Component {
  state = { listOfUsers: [] };
  service = new UserService();

  getUsersInDB = () => {
    this.service.getUserList().then((response) => {
      this.setState({ listOfUsers: response });
      console.log(this.state.listOfUsers);
    });
  };

  componentDidMount() {
    this.getUsersInDB();
  }

  render() {
    return (
      <div>
        <div>
          <div className="container-fluid bg-deep-blue">
            <div className="d-flex justify-content-center align-items-center mt-5 p-5">
              <img
                src={userListImg}
                className="w-25 d-flex"
                alt="userListImg"
              />
              <div className="ms-5">
                <h1 className="mt-3 text-white fw-bolder">Our community!</h1>
                <p className="text-white fs-5">
                  “The Pessimist Sees Difficulty In Every Opportunity. The
                  Optimist Sees Opportunity In Every Difficulty.” – Winston
                  Churchill
                </p>
                <div className="text-white d-flex align-items-end"></div>
              </div>
            </div>
          </div>
          <div className="">
            <img
              src={transition}
              className="position-relative w-100"
              alt="transition"
            />
          </div>
          <div className="container mt-5 pt-5">
            <div className="row">
              {this.state.listOfUsers.map((user) => {
                return (
                  <UserCard
                    key={user._id}
                    setTheUser={this.props.setTheUser}
                    loggedInUser={this.props.loggedInUser}
                    user={user}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
