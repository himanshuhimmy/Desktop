import api from "./api";

export const adminService = {
  createUser:       (data)       => api.post("/admin/users", data).then((r) => r.data),
  getUsers:         ()           => api.get("/admin/users").then((r) => r.data),
  toggleUserStatus: (id)         => api.patch(`/admin/users/${id}/status`).then((r) => r.data),
  updateUser:       (id, data)   => api.patch(`/admin/users/${id}`, data).then((r) => r.data),
};
