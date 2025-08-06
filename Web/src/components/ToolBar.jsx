import React from "react";
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

function ToolBar() {
    return (
        <div className="flex justify-around items-center shadow-md bg-white text-md font-bold">
            <div>
                <Link to="/"><img src={logo} alt="Logo" className="w-auto h-40" /></Link>
            </div>
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
            <div>
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded-xl h-16 hover:bg-red-600 transition duration-300"
                    
                >
                    LIÊN HỆ TƯ VẤN
                </button>
            </div>
        </div>
    );
}

export default ToolBar;
