import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // 🔥 REQUIRED
});

export default api;
