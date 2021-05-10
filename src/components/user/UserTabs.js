import React, { Component } from "react";

export default class UserTabs extends Component {
  render() {
    const { tab } = this.props;
    return (
      <ul className="nav nav-pills">
        <li className="nav-item me-2 mb-3">
          <button
            className={tab === "books" ? "btn btn-home active" : "btn btn-home"}
            onClick={() => this.props.setTab("books")}
          >
            books
          </button>
        </li>
        <li className="nav-item">
          <button
            className={
              tab === "places" ? " btn btn-home active" : "btn btn-home"
            }
            onClick={() => this.props.setTab("places")}
          >
            places
          </button>
        </li>
        <li className="nav-item">
          <button
            className={
              tab === "trades" ? " btn btn-home active" : "btn btn-home"
            }
            onClick={() => this.props.setTab("trades")}
          >
            trades
          </button>
        </li>
      </ul>
    );
  }
}
