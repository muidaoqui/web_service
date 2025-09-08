import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const BASE_URL = "http://localhost:5000";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/api/users/login`, {
        email,
        password,
      });
      if(res.data.role !== 'admin') {
        setError("Bạn không có quyền truy cập trang này");
        setLoading(false);
        return;
      }

      if (res.data.apiKey) {
        // Lưu apiKey vào localStorage
        localStorage.setItem("apiKey", res.data.apiKey);
        localStorage.setItem("role", res.data.role);
        // Điều hướng sang trang admin (tùy bạn cấu hình route)
        navigate("/admin/panel");
      } else {
        setError("Không nhận được apiKey từ server");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-orange-200 to-yellow-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-red-500 mb-6">
          Đăng nhập
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="text-sm text-gray-600 mb-1 block">Email</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 mb-4 bg-white shadow-sm">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="you@gmail.com"
              className="w-full py-2 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label className="text-sm text-gray-600 mb-1 block">Password</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 mb-4 bg-white shadow-sm">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="********"
              className="w-full py-2 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-bold disabled:opacity-50"
          >
            {loading ? "Đang xử lý..." : "Xác nhận"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-center mt-4 text-sm">{error}</p>
        )}
      </div>
    </div>
  );
}

export default AdminLogin;
