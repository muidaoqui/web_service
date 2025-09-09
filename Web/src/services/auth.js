import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Lấy token từ localStorage
function getAccessToken() {
  return localStorage.getItem("accessToken");
}
function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

// Gắn access token vào header
API.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Xử lý refresh token khi access token hết hạn
API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token");

        const res = await axios.post("http://localhost:5000/api/users/refresh", { token: refreshToken });
        const newAccessToken = res.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);
        API.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return API(originalRequest); // retry request
      } catch (refreshErr) {
        console.error("Refresh token failed:", refreshErr);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // điều hướng về login
      }
    }
    return Promise.reject(err);
  }
);

export default API;
