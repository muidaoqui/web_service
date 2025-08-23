import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const BASE_URL = "http://localhost:5000";
  const [error, setError] = useState("");
  const navigate = useNavigate();


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-orange-200 to-yellow-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-red-500 mb-6">Đăng nhập</h2>
          <>
            <label className="text-sm text-gray-600 mb-1 block">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 mb-4 bg-white shadow-sm">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="you@gmail.com"
                className="w-full py-2 outline-none"
              />
            </div>
            <label className="text-sm text-gray-600 mb-1 block">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 mb-4 bg-white shadow-sm">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="********"
                className="w-full py-2 outline-none"
              />
            </div>
            <button
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-bold disabled:opacity-50"
            >
              Xác nhận
            </button>
          </>
        {error && <p className="text-red-500 text-center mt-4 text-sm">{error}</p>}
      </div>
    </div>
  );
}

export default AdminLogin;
