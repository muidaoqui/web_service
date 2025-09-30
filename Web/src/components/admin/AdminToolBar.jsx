import React from "react";
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

function AdminToolBar() {
  return (
    <div className="fixed top-0 left-0 h-30 w-full z-50 shadow-md bg-white flex justify-between items-center px-6 py-2 font-bold text-md">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link to="/admin/panel">
          <img src={logo} alt="Logo" className="h-40 w-auto" />
        </Link>
      </div>

      {/* Menu links */}
      <div className="hidden lg:flex items-center gap-6">
        <Link to="/admin/domain" className="hover:text-blue-600 transition">TÊN MIỀN</Link>
        <Link to="/admin/hosting" className="hover:text-blue-600 transition">HOSTING</Link>
        <Link to="/admin/email" className="hover:text-blue-600 transition">EMAIL SERVER</Link>
        <Link to="/admin" className="hover:text-blue-600 transition">THIẾT KẾ WEBSITE</Link>
        <Link to="/admin/templates" className="hover:text-blue-600 transition">MẪU GIAO DIỆN</Link>
        <Link to="/admin" className="hover:text-blue-600 transition">BLOG</Link>
        <Link to="/admin" className="hover:text-blue-600 transition">CHĂM SÓC WEB</Link>
        <Link to="/admin" className="hover:text-blue-600 transition">TUYỂN DỤNG</Link>
      </div>

      {/* Admin button */}
      <div>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-xl h-12 hover:bg-red-600 transition duration-300"
        >
          Xin chào Admin
        </button>
      </div>
    </div>
  );
}

export default AdminToolBar;
