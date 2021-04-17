import React, { Component } from "react";
import UserService from "./user-service";
import { Link } from "react-router-dom";

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
        <ul>
          {this.state.listOfUsers.map((user) => {
            return (
              <li>
                <Link to={`/user/${user._id}`}>{user.username}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
