import axios from "axios";

const api = axios.create({
  baseURL: "https://captionary.onrender.com",
  withCredentials: true,
});

export default api;
