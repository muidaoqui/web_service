// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // proxy tới backend
});

// Gắn accessToken cho mọi request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
