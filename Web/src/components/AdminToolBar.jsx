import React from "react";
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
function AdminToolBar() {
  return (
  <div className="flex justify-around items-center shadow-md bg-white text-md font-bold">
            <div>
                <Link to="/admin/panel"><img src={logo} alt="Logo" className="w-auto h-40" /></Link>
            </div>
            <div className="flex justify-between items-center gap-8 cursor-pointer">
                <Link to="/admin/domain">TÊN MIỀN</Link>
                <Link to="/admin/hosting">HOSTING</Link>
                <Link to="/admin/email">EMAIL SERVER</Link>
                <Link to="/admin/web-design">THIẾT KẾ WEBSITE</Link>
                <Link to="/admin/templates">MẪU GIAO DIỆN</Link>
                <Link to="/admin/blog">BLOG</Link>
                <Link to="/admin/maintenance">CHĂM SÓC WEB</Link>
                <Link to="/admin/recruitment">TUYỂN DỤNG</Link>
            </div>
            <div>
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded-xl h-16 hover:bg-red-600 transition duration-300"
                    
                >
                    Xin chào Admin
                </button>
            </div>
        </div>
  );
}

export default AdminToolBar;
