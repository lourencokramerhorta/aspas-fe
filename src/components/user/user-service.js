import axios from "axios";

class UserService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true,
    });
    this.service = service;
  }

  setTheUser = (id) => {
    return this.service.get(`/user/${id}`).then((response) => response.data);
  };

  getUserList = () => {
    return this.service.get("/user-list").then((response) => response.data);
  };

  editUserProfile = (user, toEdit) => {
    return this.service
      .put(`/user/${user._id}/edit`, toEdit)
      .then((response) => response.data);
  };
}

export default UserService;
