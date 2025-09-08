import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute
 * @param {children} component cần render
 * @param {roles} mảng role được phép truy cập (vd: ["admin"], ["user"], ["admin","user"])
 */
function ProtectedRoute({ children, roles }) {
  const apiKey = localStorage.getItem("apiKey");
  const userRole = localStorage.getItem("role");

  // chưa login
  if (!apiKey) {
    return <Navigate to="/login" replace />;
  }

  // có login nhưng không có quyền
  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
