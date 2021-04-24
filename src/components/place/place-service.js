import axios from "axios";

class PlaceService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true,
    });
    this.service = service;
  }

  createPlace = (name, description) => {
    return this.service
      .post("/create-place", { name, description })
      .then((response) => response.data);
  };

  getThePlace = (placeId) => {
    return this.service
      .get(`/place/${placeId}`)
      .then((response) => response.data);
  };
}

export default PlaceService;
