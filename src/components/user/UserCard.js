import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UserCard extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="col-6 col-md-6 col-lg-3 col-xl-3 col-xxl-3 mt-3">
        <div className="card">
          <img src={user.imageUrl} className="card-img-top" alt="user" />

          <div className="card-body">
            <h5 className="card-title">{user.username}</h5>
            <p>Has {user.books.length} books</p>
            <Link to={`/user/${user._id}`} className="btn btn-outline-dark">
              See more
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
