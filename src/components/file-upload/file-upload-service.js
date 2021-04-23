import axios from "axios";

class FileService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true,
    });
    this.service = service;
  }
  handleUpload = (theFile) => {
    console.log("file in service: ", theFile);
    return this.service.post("/upload", theFile).then((res) => res.data);
  };
}

export default FileService;
