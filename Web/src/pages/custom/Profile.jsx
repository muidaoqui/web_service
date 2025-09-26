import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ===== Fetch user info =====
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserInfo(res.data);
        setForm({ name: res.data.name, email: res.data.email });
      } catch (err) {
        setError("Không thể tải thông tin người dùng");
        console.error(err);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  // ===== Input change =====
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  // ===== Save changes =====
  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const res = await axios.put(
        "http://localhost:5000/api/users/me",
        { ...form, ...passwordForm },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUserInfo(res.data.data);
      setForm({ name: res.data.data.name, email: res.data.data.email });
      setPasswordForm({ oldPassword: "", newPassword: "" });
      setEditing(false);

      // cập nhật lại localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: res.data.data._id,
          name: res.data.data.name,
          role: res.data.data.role,
          email: res.data.data.email,
        })
      );
    } catch (err) {
      setError(err.response?.data?.message || "Không thể cập nhật thông tin");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ===== Logout =====
  const handleLogout = () => {
    // Reset Redux + localStorage
    dispatch(logout()); // 👈 clear Redux
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!userInfo) return <p>Đang tải...</p>;

  return (
    <div className="mt-30 min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Trang Cá Nhân</h1>

      {editing ? (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <label className="block mb-2">Tên</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-4"
          />

          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-4"
          />

          <label className="block mb-2">Mật khẩu cũ</label>
          <input
            type="password"
            name="oldPassword"
            value={passwordForm.oldPassword}
            onChange={handlePasswordChange}
            className="w-full border p-2 rounded mb-4"
          />

          <label className="block mb-2">Mật khẩu mới</label>
          <input
            type="password"
            name="newPassword"
            value={passwordForm.newPassword}
            onChange={handlePasswordChange}
            className="w-full border p-2 rounded mb-4"
          />

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Hủy
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-lg mb-2">
            Xin chào, <span className="font-semibold">{userInfo.name}</span> 👋
          </p>
          <p className="text-lg mb-2">Email: {userInfo.email}</p>
          <p className="text-lg mb-6">Vai trò: {userInfo.role}</p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Chỉnh sửa
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
