import api from "./api";

export const userService = {
  getAll: () => api.get("/users").then((r) => r.data),
};

export const conversationService = {
  create:         (data)              => api.post("/conversations", data).then((r) => r.data),
  getAll:         ()                  => api.get("/conversations").then((r) => r.data),
  getById:        (id)                => api.get(`/conversations/${id}`).then((r) => r.data),
  updateMembers:  (id, action, userId)=> api.patch(`/conversations/${id}/members`, { action, userId }).then((r) => r.data),
  updateManagers: (id, action, userId)=> api.patch(`/conversations/${id}/managers`, { action, userId }).then((r) => r.data),
};
