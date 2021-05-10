import React, { Component } from "react";
import axios from "axios";
export default class BookProfile extends Component {
  state = {};

  getBook = () => {
    const { isbn } = this.props.match.params;
    axios
      .get(`${process.env.REACT_APP_API_URL}/book-profile/${isbn}`)
      .then((response) => {
        const book = response.data;
        this.setState(book);
      });
  };
 
  componentDidMount() {
    this.getBook();
  }

  render() {
    const { title, author, cover_i, first_publish_year } = this.state;
    return (
      <div className="shadow p-5 bg-golden rounded mt-5 ">
        <div className="d-flex align-items-start align-items-stretch">
          <div className="col-4">
            <img
              alt="transaction"
              src={`https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`}
              className="rounded-3 w-100 shadow"
            />
          </div>
          <div className="userCardText text-white">
            <h1>{title}</h1>
            <h5>{author}</h5>
            <h5>{first_publish_year}</h5>
          </div>
          {/* <div className="col-8 d-flex flex-column align-content-end mt-auto">
            <div className=" align-self-end">
               <div>
                <Link to="/create-place" className="me-3 btn btn-home-library">
                  Create Place
                </Link>

                <Link
                  to={`/user/${this.props.loggedInUser._id}/edit`}
                  className="me-3 btn btn-home-library"
                >
                  edit profile
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}
