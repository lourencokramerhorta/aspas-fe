import axios from "axios";

class UserService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true,
    });
    this.service = service;
  }

  getTheUser = (id) => {
    return this.service.get(`/user/${id}`).then((response) => response.data);
  };
}

export default UserService;
