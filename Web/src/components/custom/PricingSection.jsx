// components/PricingSection.jsx
import React from "react";
import bg3 from "../../assets/bg3.png";
import bg5 from "../../assets/bg5.png";
import bg6 from "../../assets/bg6.png";

function PricingSection() {
    return (
        <div className="flex flex-col">
            {/* Việt Nam */}
            <div className="flex flex-col md:flex-row justify-between items-center min-h-screen">
                <div className="md:w-1/2 space-y-6 px-20">
                    <h1 className="text-3xl font-bold text-red-600 border-b-2 border-red-600">BẢNG GIÁ TÊN MIỀN VIỆT NAM</h1>
                    <p className="text-gray-700 text-lg leading-relaxed">Tên miền Tiếng Việt nằm trong hệ thống tên miền quốc gia Việt Nam ".vn", thuộc hệ thống tên miền đa ngữ IDNS đã được quốc tế công nhận, là xu thế phát triển của công nghiệp nội dung Internet. Trong đó các ký tự tạo nên tên miền là các ký tự được quy định trong bảng mã tiếng Việt.</p>
                    <div className="grid grid-cols-2 gap-4 mt-10">
                        {[
                            [".vn", "820.000"], [".com.vn", "691.000"],
                            [".net.vn", "691.000"], [".info.vn", "397.000"],
                            [".biz.vn", "1.800.000"], [".gov.vn", "397.000"]
                        ].map(([tld, price]) => (
                            <div key={tld} className="flex justify-between items-center bg-white shadow-lg rounded-lg p-4 hover:bg-cyan-100 transition-colors cursor-pointer duration-300">
                                <p>{tld}</p><h3 className="font-bold text-red-500">{price}</h3>
                            </div>
                        ))}
                    </div>
                    <div className="mt-16 text-center w-1/2 mx-auto">
                        <h2 className="text-2xl font-bold text-white bg-red-500 p-2 rounded-xl">Xem thêm bảng giá</h2>
                    </div>
                </div>
                <div className="relative md:w-1/2 w-full h-[500px] overflow-hidden">
                        {/* Ảnh nền */}
                        <img
                            src={bg3}
                            alt="Background"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Sóng nền màu hồng */}
                        <div className="absolute inset-0 z-0">
                            <svg
                                viewBox="0 0 1440 320"
                                className="w-full h-full"
                                preserveAspectRatio="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill="#fbcfe8"
                                    fillOpacity="1"
                                    d="M0,64L48,90.7C96,117,192,171,288,186.7C384,203,480,181,576,170.7C672,160,768,160,864,149.3C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                                ></path>
                            </svg>
                        </div>

                        {/* Ảnh phía trên sóng */}
                        <div className="relative z-10 flex justify-center items-center h-full">
                            <img
                                src={bg5}
                                alt="Kiểm tra tên miền"
                                className="w-3/4 max-w-md object-contain"
                            />
                        </div>

                    </div>
            </div>

            {/* Quốc tế */}
            <div className="flex justify-between w-full">
                <div className="relative md:w-1/2 w-full h-[500px] overflow-hidden">
                        {/* Ảnh nền */}
                        <img
                            src={bg3}
                            alt="Background"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Sóng nền màu hồng */}
                        <div className="absolute inset-0 z-0">
                            <svg
                                viewBox="0 0 1440 320"
                                className="w-full h-full"
                                preserveAspectRatio="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill="#fbcfe8"
                                    fillOpacity="1"
                                    d="M0,64L48,90.7C96,117,192,171,288,186.7C384,203,480,181,576,170.7C672,160,768,160,864,149.3C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                                ></path>
                            </svg>
                        </div>

                        {/* Ảnh phía trên sóng */}
                        <div className="relative z-10 flex justify-center items-center h-full">
                            <img
                                src={bg6}
                                alt="Kiểm tra tên miền"
                                className="w-3/4 max-w-md object-contain"
                            />
                        </div>

                    </div>
                <div className="md:w-1/2 w-full space-y-6 px-20">
                    <h1 className="text-3xl font-bold text-red-600 border-b-2 border-red-600 text-right">BẢNG GIÁ TÊN MIỀN QUỐC TẾ</h1>
                    <p className="text-gray-700 text-lg leading-relaxed text-right">Tổ chức Quản lý tên miền quốc tế ICANN mới đưa ra các tên miền quốc tế mở rộng dành cho các nhà đăng ký (Registrar). Các tên miền này được chia ra theo các lĩnh vực nhằm giúp các cá nhân, doanh nghiệp có thêm nhiều lựa chọn tên miền phù hợp cho mình bên cạnh các tên miền quốc tế truyền thống như .com, net, org...</p>
                    <div className="grid grid-cols-2 gap-4 mt-10 ">
                        {[
                            [".com", "366.120"], [".net", "415.800"],
                            [".info", "680.400"], [".org", "1.200.000"],
                            [".biz", "1.500.000"], [".xyz", "2.000.000"]
                        ].map(([tld, price]) => (
                            <div key={tld} className="flex justify-between items-center bg-white shadow-lg rounded-lg p-4 hover:bg-cyan-100 transition-colors cursor-pointer duration-300 ">
                                <p>{tld}</p><h3 className="font-bold text-red-500">{price}</h3>
                            </div>
                        ))}
                    </div>
                    <div className="mt-16 text-center w-1/2 mx-auto">
                        <h2 className="text-2xl font-bold text-white bg-red-500 p-2 rounded-xl">Xem thêm bảng giá</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PricingSection;
