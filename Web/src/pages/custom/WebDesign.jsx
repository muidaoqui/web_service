import React from "react";
import mau from "../../assets/mau.png";
import mau1 from "../../assets/mau1.png";
import Procedure from "../../components/custom/Procedure";
import Adventage from "../../components/custom/Advantage";

function WebDesign() {
    return (
        <div className="relative  to-gray-100 overflow-hidden py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center bg-gradient-to-t from-white">
                {/* Left content */}
                <div className="md:w-1/2 text-center md:text-left space-y-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-red-700 leading-snug">
                        Thiết kế website cho doanh nghiệp <br />
                        và bán hàng chuyên nghiệp
                    </h1>
                    <p className="text-gray-700 text-lg">
                        Tăng sự thu hút khách hàng và doanh thu bán hàng online với trang web bán hàng
                        được tạo chuẩn SEO, bắt mắt.
                    </p>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold shadow-md">
                        Đăng ký thiết kế ngay
                    </button>
                </div>

                {/* Right content - image mockup */}
                <div className="md:w-1/2 mt-10 md:mt-0 relative">
                    <div className="relative">
                        {/* Website image */}
                        <img
                            src={mau}
                            alt="Website Demo"
                            className="rounded-lg shadow-lg border"
                        />
                        {/* Popup product card */}
                        <div className="absolute bottom-4 right-0 bg-white rounded-xl shadow-lg p-4 w-56">
                            <img
                                src={mau1}
                                alt="Áo Ba Lỗ Bé Trai Cotton"
                                className="w-20 h-20 object-cover rounded-md mb-2"
                            />
                            <p className="text-sm font-medium">Áo Ba Lỗ Bé Trai Cotton</p>
                            <p className="text-red-600 font-bold">410.000 đ</p>
                            <button className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md">
                                Thêm vào giỏ
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-20 w-6 h-6 border-2 border-pink-300 rounded-full"></div>
                <div className="absolute bottom-20 left-10 w-5 h-5 border-2 border-green-300 rounded"></div>
                <div className="absolute top-1/3 right-16 w-6 h-6 border-2 border-yellow-300 rotate-45"></div>
                <div className="absolute bottom-10 right-24 w-5 h-5 border-2 border-blue-300 rotate-12"></div>
            </div>
            <Procedure />
            <Adventage />
        </div>
    );
}

export default WebDesign;
