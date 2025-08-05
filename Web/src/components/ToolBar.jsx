import React from "react";
import logo from '../assets/logo.png';

function ToolBar() {
    return (
        <div className="flex justify-around items-center shadow-md bg-white text-md font-bold">
            <div>
               <img src={logo} alt="Logo" className="w-auto h-40" />
            </div>
            <div className="flex justify-between items-center gap-8">
                <div>TÊN MIỀN</div>
                <div>HOSTING</div>
                <div>EMAIL SERVER</div>
                <div>THIẾT KẾ WEBSITE</div>
                <div>MẪU GIAO DIỆN</div>
                <div>BLOG</div>
                <div>CHĂM SÓC WEB</div>
                <div>TUYỂN DỤNG</div>
            </div>
            <div>
                <button className="bg-red-500 text-white py-2 px-4 rounded-xl h-16 hover:bg-red-600 transition duration-300">
                    LIÊN HỆ TƯ VẤN
                </button>
            </div>
        </div>
    );

}

export default ToolBar;