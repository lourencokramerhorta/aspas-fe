import axios from "axios";

class BookService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true,
    });
    this.service = service;
  }

  findOrCreate = (book) => {
    return this.service
      .post("/find-or-create", { book })
      .then((response) => response.data);
  };
}

export default BookService;
