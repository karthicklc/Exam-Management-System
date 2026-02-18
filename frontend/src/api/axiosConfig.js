import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://exam-management-system-1-li6t.onrender.com/api/",
});

// Add token to every request if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;