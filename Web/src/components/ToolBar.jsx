import React from "react";
import logo from '../assets/logo.png';

function ToolBar() {
    return (
        <div className="flex justify-around items-center">
            <div>
               <img src={logo} alt="Logo" className="w-auto h-40" />
            </div>
            <div className="flex justify-between items-center gap-16">
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
                
            </div>
        </div>
    );

}

export default ToolBar;