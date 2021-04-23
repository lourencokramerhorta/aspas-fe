import axios from "axios";

class transactionService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true,
    });
    this.service = service;
  }

  makeTrade = (book1, book2, profileUserId, type) => {
    return this.service
      .post(`/trade`, { book1, book2, profileUserId, type })
      .then((response) => response.data);
  };
}

export default transactionService;
