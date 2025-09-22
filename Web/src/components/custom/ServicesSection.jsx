// components/ServicesSection.jsx
import React from "react";
import RotatingDots from "./RotatingDots";
import Laptop from "../../assets/Laptop.png";
import Domain from "../../assets/Domain.png";
import Email from "../../assets/Email.png";
import WebHosting from "../../assets/WebHosting.png";
import bg3 from "../../assets/bg3.png";

function ServicesSection() {
    return (
        <div className="relative min-h-screen flex justify-center items-center overflow-hidden">
            <img src={bg3} alt="Background" className="absolute inset-0 w-3/4 object-cover z-0" />
            <div className="relative z-10 flex w-full min-h-screen">
                <div className="w-1/2 flex items-center justify-center">
                    <RotatingDots />
                </div>
                <div className="w-1/2 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-10 p-10 mr-10">
                        {[{ img: Laptop, title: "Thiết kế Website", desc: "Website, đầy đủ tính năng chính của website. Tất cả các tính năng đều có thể quản trị nội dung thông qua trang quản trị" },
                          { img: Domain, title: "Tên miền", desc: "Domain hỗ trợ đầy đủ các chức năng thay đổi các record hoàn toàn miễn phí thông qua Controlpanel:A Record,MX Record" },
                          { img: Email, title: "Email", desc: "Email Server là giải pháp Mail dành cho các công ty có nhu cầu sử dụng số lượng Mail nhiều để giao dịch thương mại" },
                          { img: WebHosting, title: "Web Hosting", desc: "Là giải pháp cho các cá nhân hoặc doanh nghiệp muốn có một website giới thiệu, giao dịch thương mại trên Internet" }]
                          .map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-4 rounded-lg shadow-lg bg-white/80 p-4">
                                <img src={item.img} alt={item.title} className="w-16 h-auto" />
                                <h1 className="text-center text-red-500 text-2xl font-bold">{item.title}</h1>
                                <p className="text-center text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServicesSection;
