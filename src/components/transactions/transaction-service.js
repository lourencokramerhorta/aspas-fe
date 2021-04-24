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
      .post(`/trade`, { book1, book2, profileUserId, type })
      .then((response) => response.data);
  };
}

export default transactionService;
