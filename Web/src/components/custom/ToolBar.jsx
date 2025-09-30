import React, { useEffect } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../../slices/authSlice";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";

function ToolBar() {
  const BASE_URL = "http://localhost:5000";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, accessToken } = useSelector((state) => state.auth);

  // Khi reload, lấy lại user từ /users/me
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token && !user) {
      axios
        .get(`${BASE_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("Fetch /me success:", res.data);
          const u = res.data?.user;
          if (u) {
            dispatch(
              loginSuccess({
                user: u,
                accessToken: token,
                refreshToken: localStorage.getItem("refreshToken"),
              })
            );
            localStorage.setItem("user", JSON.stringify(u));
          }
        })
        .catch((err) => {
          console.error("Status:", err.response?.status);
          console.error("Data:", err.response?.data);
          console.error("Fetch /me error:", err);
        });
    }
  }, [user, dispatch]);

  const handleProfileClick = () => navigate("/profile");

  const handleLogout = () => {
    if (!window.confirm("Bạn có chắc chắn muốn đăng xuất?")) return;
    dispatch(logout());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-white flex justify-between items-center px-6 py-2 font-bold text-md h-30">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-40 w-auto" />
        </Link>
      </div>

      {/* Menu */}
      <div className="hidden lg:flex items-center gap-6">
        <Link to="/domain" className="hover:text-blue-600 transition">TÊN MIỀN</Link>
        <Link to="/hosting" className="hover:text-blue-600 transition">HOSTING</Link>
        <Link to="/email" className="hover:text-blue-600 transition">EMAIL SERVER</Link>
        <Link to="/web-design" className="hover:text-blue-600 transition">THIẾT KẾ WEBSITE</Link>
        <Link to="/templates" className="hover:text-blue-600 transition">MẪU GIAO DIỆN</Link>
        <Link to="/blog" className="hover:text-blue-600 transition">BLOG</Link>
        <Link to="/maintenance" className="hover:text-blue-600 transition">CHĂM SÓC WEB</Link>
        <Link to="/recruitment" className="hover:text-blue-600 transition">TUYỂN DỤNG</Link>
      </div>

      {/* User / Login */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-xl h-12 hover:bg-green-600 transition duration-300"
              onClick={handleProfileClick}
            >
              Xin chào {user.name}
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-xl h-12 hover:bg-red-600 transition duration-300"
              onClick={handleLogout}
            >
              <FaSignOutAlt />
            </button>
          </>
        ) : (
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-xl h-12 hover:bg-red-600 transition duration-300"
            onClick={() => navigate("/login")}
          >
            ĐĂNG NHẬP
          </button>
        )}
      </div>
    </div>
  );
}

export default ToolBar;
