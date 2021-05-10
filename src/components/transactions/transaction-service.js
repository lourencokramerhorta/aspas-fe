import axios from "axios";

class transactionService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true,
    });
    this.service = service;
  }

  makeTrade = (book1, book2, profileUserId, type) => {
    return this.service
      .post(`/trade`, book1, book2, profileUserId, type)
      .then((response) => response.data);
  };

  allMyTrades = (userId) => {
    return this.service
      .get(`/trade/${userId}`)
      .then((response) => response.data);
  };
  findAllTradesInDB = () => {
    return this.service.get("/trade-list").then((allTrades) => allTrades.data);
  };
  acceptTrade = (tradeID, tradeBody) => {
    return this.service
      .put("/accept-trade", tradeID)
      .then((updatedTrade) => updatedTrade.data)
      .catch((err) => err);
  };
}

export default transactionService;
