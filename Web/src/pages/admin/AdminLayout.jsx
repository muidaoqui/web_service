import React from "react";
import AdminToolBar from "../../components/AdminToolBar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-orange-200 to-yellow-100">
      {/* Toolbar nằm trên cùng */}
      <AdminToolBar />

      {/* Nội dung trang admin */}
      <div className="w-full p-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
