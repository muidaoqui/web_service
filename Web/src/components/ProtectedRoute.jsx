import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children, roles }) {
  // Lấy thông tin từ Redux
  const { user, accessToken } = useSelector((state) => state.auth);

  // Nếu Redux chưa có thì fallback từ localStorage
  const savedUser = !user ? JSON.parse(localStorage.getItem("user")) : user;
  const token = accessToken || localStorage.getItem("accessToken");

  // Nếu chưa đăng nhập → chuyển hướng login
  if (!savedUser || !token) {
    return <Navigate to="/login" replace />;
  }

  // Nếu có roles và user.role không nằm trong roles → cấm truy cập
  if (roles && !roles.includes(savedUser.role)) {
    return <Navigate to="/home" replace />;
  }

  // Nếu pass hết check thì cho render children
  return children;
}

export default ProtectedRoute;
