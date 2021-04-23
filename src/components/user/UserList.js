import React, { Component } from "react";
import UserService from "./user-service";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";

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
      <div className="">
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
    );
  }
}
