import axios from "axios";

class BookService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true,
    });
    this.service = service;
  }

  findOrCreate = (book) => {
    return this.service
      .post("/find-or-create", { book })
      .then((response) => response.data);
  };

  removeBook = (id) => {
    return this.service.post(`/remove-book/${id}`).then((res) => res.data);
  };

  findABook = (isbn) => {
    return this.service
      .post(`/book-profile/${isbn}`)
      .then((response) => response.data);
  };
}

export default BookService;
