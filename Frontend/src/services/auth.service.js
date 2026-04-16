import api from "./api";

export const authService = {
  login:  (email, password) => api.post("/auth/login", { email, password }).then((r) => r.data),
  getMe:  ()               => api.get("/auth/me").then((r) => r.data),
};
