// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // proxy tới backend
});

// Gắn apiKey cho mọi request
api.interceptors.request.use((config) => {
  const apiKey = localStorage.getItem("apiKey");
  if (apiKey) {
    config.headers.Authorization = `Bearer ${apiKey}`;
  }
  return config;
});

export default api;
