import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://resume-builder-iivc.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getMe: () => api.get("/auth/me"),
};

// Resume API
export const resumeAPI = {
  getAll: () => api.get("/resume"),
  getById: (id) => api.get(`/resume/${id}`),
  // Get resume without auth - for public/shared resumes
  getPublicById: (id) => axios.get(`${API_BASE_URL}/resume/${id}`),
  create: (data) => api.post("/resume", data),
  update: (id, data) => api.patch(`/resume/${id}`, data),
  delete: (id) => api.delete(`/resume/${id}`),
  updateTitle: (id, title) => api.patch(`/resume/${id}/title`, { title }),
  toggleAccess: (id) => api.patch(`/resume/${id}/access`),
};

// PDF API
export const pdfAPI = {
  generate: (id) =>
    api.post(`/pdf/generate/${id}`, {}, { responseType: "blob" }),
};

export default api;
