import React from "react";
import { Radio, Tabs } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import poster from "../assets/poster.png"
import { FiHardDrive, FiGlobe, FiDatabase, FiMail, FiRefreshCw, FiWifi } from "react-icons/fi";
import { FaFireAlt, FaDatabase, FaGlobe, FaShieldAlt, FaLifeRing, FaTools, FaBug, FaTachometerAlt, FaBinoculars } from "react-icons/fa";

function Hosting() {

    const hostingThuongMai = [
        {
            name: "Gói 10GB",
            price: "648.000",
            dungluong: "10GB",
            subdomain: "400",
            mysql: "10",
            email: "KGH",
            backup: "Miễn phí",
            yearly: "7.776.000đ",
        },
        {
            name: "Gói 20GB",
            price: "1.080.000",
            dungluong: "20GB",
            subdomain: "KGH",
            mysql: "20",
            email: "KGH",
            backup: "Miễn phí",
            yearly: "12.960.000đ",
        },
        {
            name: "Gói 30GB",
            price: "1.447.200",
            dungluong: "30GB",
            subdomain: "KGH",
            mysql: "30",
            email: "KGH",
            backup: "Miễn phí",
            yearly: "17.366.400đ",
        },
        {
            name: "Gói 50GB",
            price: "2.160.000",
            dungluong: "50GB",
            subdomain: "KGH",
            mysql: "50",
            email: "KGH",
            backup: "Miễn phí",
            yearly: "25.920.000đ",
        },
        {
            name: "Gói 100GB",
            price: "3.240.000",
            dungluong: "100GB",
            subdomain: "KGH",
            mysql: "100",
            email: "KGH",
            backup: "Miễn phí",
            yearly: "38.880.000đ",
        },
    ];

    const HostingCard = ({ plan }) => (
        <div className="bg-gradient-to-b from-gray-100 to-white rounded-xl shadow-lg hover:shadow-2xl p-6 w-full text-center border border-gray-200 transition-all duration-300 hover:-translate-y-1">
            {/* Giá */}
            <p className="text-2xl font-bold text-red-600 mt-2">
                {plan.price} <span className="text-lg text-gray-700">x 12 tháng</span>
            </p>

            {/* Tên gói */}
            <h2 className="text-xl font-bold text-green-700 mt-1">{plan.name}</h2>

            {/* Thông số */}
            <ul className="w-full text-sm text-left mt-4 flex flex-col gap-3">
                <li className="flex justify-between items-center w-full border-b border-gray-300 pb-2">
                    <span className="flex items-center gap-2 font-medium text-gray-700">
                        <FiHardDrive className="text-green-600" /> Dung lượng:
                    </span>
                    <span>{plan.dungluong}</span>
                </li>
                <li className="flex justify-between items-center w-full border-b border-gray-300 pb-2">
                    <span className="flex items-center gap-2 font-medium text-gray-700">
                        <FiWifi className="text-blue-500" /> Băng thông:
                    </span>
                    <span>KGH</span>
                </li>
                <li className="flex justify-between items-center w-full border-b border-gray-300 pb-2">
                    <span className="flex items-center gap-2 font-medium text-gray-700">
                        <FiGlobe className="text-purple-500" /> Subdomain:
                    </span>
                    <span>{plan.subdomain}</span>
                </li>
                <li className="flex justify-between items-center w-full border-b border-gray-300 pb-2">
                    <span className="flex items-center gap-2 font-medium text-gray-700">
                        <FiDatabase className="text-orange-500" /> MySQL:
                    </span>
                    <span>{plan.mysql}</span>
                </li>
                <li className="flex justify-between items-center w-full border-b border-gray-300 pb-2">
                    <span className="flex items-center gap-2 font-medium text-gray-700">
                        <FiMail className="text-pink-500" /> Địa chỉ Mail:
                    </span>
                    <span>{plan.email}</span>
                </li>
                <li className="flex justify-between items-center w-full border-b border-gray-300 pb-2">
                    <span className="flex items-center gap-2 font-medium text-gray-700">
                        <FiRefreshCw className="text-teal-500" /> Backup:
                    </span>
                    <span>{plan.backup}</span>
                </li>
            </ul>

            {/* Giá năm */}
            <p className="mt-4 text-sm font-semibold">
                Chi phí/năm: <span className="text-red-500">{plan.yearly}</span>
            </p>

            {/* Nút đăng ký */}
            <button className="mt-4 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 hover:scale-105 transition-all duration-300">
                Đăng Ký Ngay
            </button>
        </div>
    );



    const renderPlans = (plans) => {
        const settings = {
            dots: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3000,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ],
        };

        return (
            <Slider {...settings}>
                {plans.map((plan, index) => (
                    <div key={index} className="p-4">
                        <HostingCard plan={plan} />
                    </div>
                ))}
            </Slider>
        );
    };



    const tabItems = [
        {
            label: "Hosting Thương Mại",
            key: "1",
            children: renderPlans(hostingThuongMai),
        },
        {
            label: "Hosting VIP",
            key: "2",
            children: <div>Gói VIP đang cập nhật...</div>,
        },
        {
            label: "Hosting Phổ Thông",
            key: "3",
            children: <div>Gói phổ thông đang cập nhật...</div>,
        },
    ];

    const features = [
        {
            icon: <FaFireAlt className="text-red-500 text-4xl" />,
            title: "Nhanh chóng - Bảo mật",
            desc: "Sử dụng công nghệ cân bằng tải... an toàn và bảo mật"
        },
        {
            icon: <FaDatabase className="text-yellow-500 text-4xl" />,
            title: "Dữ liệu Database",
            desc: "Toàn bộ dữ liệu website và dữ liệu khách hàng được sao lưu định kỳ..."
        },
        {
            icon: <FaGlobe className="text-orange-500 text-4xl" />,
            title: "Đa dạng địa chỉ IP",
            desc: "Cung cấp giải pháp SEO hosting với nhiều địa chỉ IP khác..."
        },
        {
            icon: <FaShieldAlt className="text-green-500 text-4xl" />,
            title: "Bảo mật dữ liệu",
            desc: "Phần mềm quản trị Direct Admin... ngăn chặn tấn công Local-Attack"
        },
        {
            icon: <FaLifeRing className="text-pink-500 text-4xl" />,
            title: "Hỗ trợ 24/7",
            desc: "Chúng tôi luôn có đội ngũ kỹ thuật giàu kinh nghiệm..."
        },
        {
            icon: <FaTools className="text-gray-600 text-4xl" />,
            title: "Công cụ quản lý dễ dàng",
            desc: "Tích hợp sẵn tính năng quản lý IP... cho các website"
        },
        {
            icon: <FaBinoculars className="text-blue-500 text-4xl" />,
            title: "Chống SPAM/VIRUS",
            desc: "Hệ thống sử dụng phần mềm Anti-spam Spam Assassin..."
        },
        {
            icon: <FaTachometerAlt className="text-red-400 text-4xl" />,
            title: "Tối ưu hóa website",
            desc: "Giúp website hoạt động trơn tru hơn..."
        },
        {
            icon: <FaBug className="text-red-600 text-4xl" />,
            title: "Khắc phục sự cố",
            desc: "Đội ngũ kỹ thuật chuyên nghiệp... giảm thiểu rủi ro"
        }
    ];

    return (
        <div className="bg-gray-100">
            <img src={poster} alt="poster" className="w-full" />
            <div className="flex flex-col justify-center items-center py-16">
                <div className="w-3/4">
                    <h1 className="text-3xl font-bold text-center text-red-500">
                        BẢNG GIÁ HOSTING TẠI MD
                    </h1>
                    <p className="text-lg text-gray-700 mt-4 text-center">
                        Là gói dịch vụ lưu trữ website chuyên nghiệp có máy chủ đặt tại Việt Nam với đường truyền tốc độ cao và sử dụng công nghệ đám mây. Linux Hosting luôn là giải pháp phù hợp cho các cá nhân hoặc doanh nghiệp muốn có một website giới thiệu, giao dịch thương mại trên Internet một cách hiệu quả và tiết kiệm chi phí.
                    </p>
                </div>
                <div className="mt-10 w-full flex justify-center">
                    <div className="w-full px-16">
                        <Tabs defaultActiveKey="1" items={tabItems} centered />
                    </div>
                </div>
                <div className="py-16">
                    <h1 className="text-3xl font-bold text-center text-red-500">NHỮNG LỢI ÍCH KHI ĐĂNG KÝ HOSTING TẠI MD</h1>
                    <p className="text-lg text-gray-700 mt-4 text-center">Chúng tôi chuẩn hóa toàn bộ quy trình quản lý hosting bằng công nghệ để mang đến sự thuận tiện và trải nghiệm tối đa cho khách hàng.</p>
                </div>

                <div className="max-w-6xl mx-auto  px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
                            >
                                {f.icon}
                                <h3 className="mt-4 text-lg font-bold text-gray-900">{f.title}</h3>
                                <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hosting;