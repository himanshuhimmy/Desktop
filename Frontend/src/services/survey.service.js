import api from "./api";

export const surveyService = {
  create:       (data)           => api.post("/surveys", data).then((r) => r.data),
  getPending:   ()               => api.get("/surveys").then((r) => r.data),
  getAll:       ()               => api.get("/surveys/all").then((r) => r.data),
  getDashboard: ()               => api.get("/surveys/dashboard").then((r) => r.data),
  toggleStatus: (id)             => api.patch(`/surveys/${id}/status`).then((r) => r.data),
  respond:      (id, body)       => api.post(`/surveys/${id}/respond`, body).then((r) => r.data),
  getResponses:      (id)         => api.get(`/surveys/${id}/responses`).then((r) => r.data),
  resetUserResponse: (id, userId) => api.delete(`/surveys/${id}/respond/${userId}`).then((r) => r.data),
};
