import React, { Component } from "react";
import TradeService from "./transaction-service";
import TradeCard from "./TradeCard";

export default class TradeList extends Component {
  state = {
    allTradesInDB: [],
  };

  tradeService = new TradeService();
  findAllTradesInDB = async () => {
    const allTrades = await this.tradeService.findAllTradesInDB();
    this.setState({ allTradesInDB: allTrades });
    console.log(this.state.allTradesInDB);
  };

  componentDidMount = () => {
    this.findAllTradesInDB();
  };

  render() {
    return (
      <div className="mt-5 pt-5">
        {this.state.allTradesInDB.reverse().map((trade) => {
          return (
            <div key={trade._id}>
              <TradeCard trade={trade} loggedInUser={this.props.loggedInUser} />
            </div>
          );
        })}
      </div>
    );
  }
}
