import api from "./axios";

export const register = (data) =>
  api.post("/api/auth/register", data);

export const login = (data) =>
  api.post("/api/auth/login", data);
