import React from "react";
import AdminToolBar from "../../components/admin/AdminToolBar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-black">
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
