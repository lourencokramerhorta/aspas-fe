import React, { Component } from "react";
import TradeService from "./transaction-service";
import TradeCard from "./TradeCard";

export default class myTrades extends Component {
  state = {
    allMyTrades: [],
  };
  tradeService = new TradeService();

  allMyTrades = async () => {
    const trades = await this.tradeService.allMyTrades(
      this.props.profileUser._id
    );
    this.setState({ allMyTrades: trades });
  };

  componentDidMount = () => {
    this.allMyTrades();
  };

  render() {
    return (
      <div>
        {this.state.allMyTrades.map((trade) => {
          return (
            <div key={trade._id}>
              <TradeCard
                trade={trade}
                profileUser={this.props.profileUser}
                loggedInUser={this.props.loggedInUser}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
