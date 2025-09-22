import React, { useEffect } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../../slices/authSlice";
import { FaSignOutAlt } from "react-icons/fa";

function ToolBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Lấy user từ Redux store
  const { user } = useSelector((state) => state.auth);

  // Khi load lại trang, đồng bộ Redux với localStorage
  useEffect(() => {
    if (!user) {
      const savedUser = localStorage.getItem("user");
      const accessToken = localStorage.getItem("accessToken");
      if (savedUser && accessToken) {
        dispatch(
          loginSuccess({
            user: JSON.parse(savedUser),
            accessToken,
            refreshToken: localStorage.getItem("refreshToken"),
          })
        );
      }
    }
  }, [user, dispatch]);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    // Xác nhận đăng xuất
    if (!window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      return;
    }
    // Xóa Redux + localStorage
    dispatch(logout());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex justify-around items-center shadow-md bg-white text-md font-bold">
      {/* Logo */}
      <div>
        <Link to="/">
          <img src={logo} alt="Logo" className="w-auto h-40" />
        </Link>
      </div>

      {/* Menu */}
      <div className="flex justify-between items-center gap-8 cursor-pointer">
        <Link to="/domain">TÊN MIỀN</Link>
        <Link to="/hosting">HOSTING</Link>
        <Link to="/email">EMAIL SERVER</Link>
        <Link to="/web-design">THIẾT KẾ WEBSITE</Link>
        <Link to="/templates">MẪU GIAO DIỆN</Link>
        <Link to="/blog">BLOG</Link>
        <Link to="/maintenance">CHĂM SÓC WEB</Link>
        <Link to="/recruitment">TUYỂN DỤNG</Link>
      </div>

      {/* User / Login */}
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-xl h-16 hover:bg-green-600 transition duration-300"
              onClick={handleProfileClick}
            >
              Xin chào {user.name}
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-xl h-16 hover:bg-red-600 transition duration-300"
              onClick={handleLogout}
            >
              <FaSignOutAlt />
            </button>
          </div>
        ) : (
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-xl h-16 hover:bg-red-600 transition duration-300"
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
