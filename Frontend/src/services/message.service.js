import api from "./api";

export const messageService = {
  send:     (conversationId, text) => api.post(`/messages/${conversationId}`, { text }).then((r) => r.data),
  getAll:   (conversationId, page = 1) => api.get(`/messages/${conversationId}?page=${page}`).then((r) => r.data),
  markRead: (conversationId) => api.patch(`/messages/${conversationId}/read`).then((r) => r.data),
};
