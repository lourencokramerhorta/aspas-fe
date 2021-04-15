import React, { Component } from "react";
import UserService from "./user-service";
import axios from "axios";

export default class UserProfile extends Component {
  state = {};
  service = new UserService();

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const { id } = this.props.match.params;
    const user = await this.service.getTheUser(id);
    console.log("user", user);
    this.setState(user);
  };
  render() {
    return (
      <div>
        <h3>{this.state.username}</h3>
        <p>{this.state.books}</p>
        {/* {this.state.books.map((book) => {
          return <p>{book}</p>;
        })} */}
      </div>
    );
  }
}
