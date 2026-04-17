import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // browser sends HttpOnly cookie automatically on every request
});

// Global 401 handler — redirect to login if session expired
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      window.location.href = "/"; // redirect to login
    }
    return Promise.reject(err);
  },
);

export default api;
