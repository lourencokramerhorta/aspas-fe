import React, { Component } from "react";
import axios from "axios";

export default class BookProfile extends Component {
  state = {};

  componentDidMount() {
    this.getBook();
  }
  getBook = () => {
    const { isbn } = this.props.match.params;
    axios.get(`${process.env.REACT_APP_API_URL}/book-profile/${isbn}`).then((response) => {
      const book = response.data;
      this.setState(book);
    });
  };

  render() {
    return (
      <div>
        <h3>{this.state.title}</h3>
        <p>{this.state.author}</p>
        <img
          src={`https://covers.openlibrary.org/b/id/${this.state.cover_i}-L.jpg`}
          className="card-img-top"
          alt="book cover"
        />
      </div>
    );
  }
}
