import React from "react";
import logo from '../../assets/logo.png'
import { FaRegHeart } from "react-icons/fa";
import AdminToolBar from "../../components/AdminToolBar";
import { Outlet } from "react-router-dom";

function AdminPanel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-orange-200 to-yellow-100 ">
        {/* Toolbar nằm trên cùng */}
      <AdminToolBar />

      <div className="flex w-full">

        {/* Outlet bên phải */}
        <div className=" p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
