import axios from "axios";

class OpenLibraryService {
  constructor() {
    let service = axios.create({
      baseURL: "https://openlibrary.org/",
    });
    this.service = service;
  }

  search = (query) => {
    return this.service
      .get(`search.json?q=${query}`)
      .then((response) => response.data);
  };
}

export default OpenLibraryService;
