import axios from "axios";

class PlaceService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true,
    });
    this.service = service;
  }

  createPlace = () => {
    return this.service.post("/create-place").then((response) => response.data);
  };
}

export default PlaceService;
