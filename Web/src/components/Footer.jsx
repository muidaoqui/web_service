import React from "react";
import logo from '../assets/logo.png';
function Footer() {
    return (
        <div className="bg-white">
            <div className="flex w-full justify-between items-center p-4 shadow-md divide-x divide-cyan-300">
                <div className="w-1/4">
                    <img src={logo} alt="Logo" className="w-auto " />
                </div>
                <div className="w-1/2 text-left flex flex-col gap-2 mx-8">
                    <p className="text-2xl font-bold text-cyan-400">CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ MD</p>
                    <p>390 Nữ Dân Công, Vĩnh Lộc A, H. Bình Chánh, TP. HCM</p>
                    <p>Điện thoại: (84+) 077 3153 987</p>
                    <p>Email: muidao156@md.com</p>
                    <p>Website: www.md.com</p>
                    <p>Facebook: fb.com/md</p>
                    <p>Instagram: instagram.com/md</p>
                </div>
                <div className="w-1/4 text-right">
                    <p>Copyright © 2025 MD Company. </p>
                    <p>All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;