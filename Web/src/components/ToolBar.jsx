import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

function ToolBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Giả sử bạn lưu user sau khi login: localStorage.setItem("user", JSON.stringify(userObj));
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleProfileClick = () => {
    navigate("/profile"); // Trang profile user
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

      {/* Button */}
      <div>
        {user ? (
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-xl h-16 hover:bg-green-600 transition duration-300"
            onClick={handleProfileClick}
          >
            Xin chào {user.name}
          </button>
        ) : (
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-xl h-16 hover:bg-red-600 transition duration-300"
            onClick={() =>
              (window.location.href = "https://www.facebook.com/mui.ao.714373")
            }
          >
            LIÊN HỆ TƯ VẤN
          </button>
        )}
      </div>
    </div>
  );
}

export default ToolBar;
