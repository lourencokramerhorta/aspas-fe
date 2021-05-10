import React, { Component } from "react";
import tradeImg from "../images/transfer.svg";
import TradeService from "./transaction-service";

export default class TradeCard extends Component {
  state = { trade: { ...this.props.trade } };
  tradeService = new TradeService();

  acceptTrade = async () => {
    const response = await this.tradeService.acceptTrade({
      tradeID: this.state.trade._id,
    });
    this.setState({ trade: response.transaction });
    console.log("updatedTrade", response);
  };

  render() {
    const { trade } = this.state;

    console.log("trade", this.state.trade);

    return (
      <div className="container">
        <div className="d-flex align-items-center justify-content-between p-4 bg-white mb-4 shadow shadow-rounded">
          <div className="d-flex align-items-end">
            <div
              style={{
                backgroundImage: "url(" + trade.user1.imageUrl + ")",
                width: "80px",
                height: "80px",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                borderRadius: "50%",
              }}
            ></div>
            <div
              style={{
                backgroundImage:
                  "url(" +
                  `https://covers.openlibrary.org/b/id/${trade.book2.cover_i}-M.jpg` +
                  ")",
                width: "50px",
                height: "80px",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                marginLeft: "20px ",
              }}
            ></div>
          </div>
          <div className="row">
            <img src={tradeImg} alt="tradeImg" className="tradeImg" />

            {trade.status === "pending" &&
              this.props.loggedInUser._id === trade.user1._id && (
                <button className="btn btn-home-library mt-3">
                  waiting for {trade.user2.username}
                </button>
              )}
            {trade.status === "complete" &&
              this.props.loggedInUser._id === trade.user1._id && (
                <button className="btn btn-home-library mt-3">
                  {trade.user2.username} has accepted
                </button>
              )}
            {trade.status === "pending" &&
              this.props.loggedInUser._id === trade.user2._id && (
                <button
                  className="btn btn-home-library mt-3"
                  onClick={() => this.acceptTrade()}
                >
                  accept
                </button>
              )}
            {trade.status === "complete" &&
              this.props.loggedInUser._id === trade.user2._id && (
                <button className="btn btn-home-library mt-3">done</button>
              )}
          </div>

          <div className="d-flex align-items-end">
            <div
              style={{
                backgroundImage:
                  "url(" +
                  `https://covers.openlibrary.org/b/id/${trade.book1.cover_i}-M.jpg` +
                  ")",
                width: "50px",
                height: "80px",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div>
            <div
              style={{
                backgroundImage: "url(" + trade.user2.imageUrl + ")",
                width: "80px",
                height: "80px",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                marginLeft: "20px ",
                borderRadius: "50%",
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}
