import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import bg2 from "../assets/bg2.png";
import bg3 from "../assets/bg3.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaGift } from "react-icons/fa";

function PrevArrow(props) {
    return (
        <button
            {...props}
            className="slick-prev absolute z-10 text-red-600 -left-5"
            aria-label="Previous"
        >
            <MdKeyboardArrowLeft size={24} />
        </button>
    );
}

function NextArrow(props) {
    return (
        <button
            {...props}
            className="slick-next absolute z-10 text-red-600 -right-5"
            aria-label="Next"
        >
            <MdKeyboardArrowRight size={24} />
        </button>
    );
}

const domains = [
    { type: ".com", price: "366.120₫" },
    { type: ".net", price: "415.800₫" },
    { type: ".info", price: "680.400₫" },
    { type: ".vn", price: "750.000₫" },
    { type: ".org", price: "1.200.000₫" },
    { type: ".biz", price: "1.500.000₫" },
    { type: ".xyz", price: "2.000.000₫" },
    { type: ".top", price: "2.500.000₫" },
];

const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
};

function DomainChecker() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex w-full  items-center justify-between ">
                {/* Cột trái */}
                <div className="w-1/2 flex flex-col items-center text-center px-8">
                    <h1 className="text-4xl font-bold text-red-600">KIỂM TRA TÊN MIỀN</h1>
                    <p className="mt-2 text-base text-gray-700">
                        Đăng ký tên miền ngay từ bây giờ để bảo vệ thương hiệu của bạn
                    </p>

                    <div className="mt-10 w-full max-w-lg">
                        <div className="flex items-center rounded-full border border-red-500 overflow-hidden">
                            <input
                                type="text"
                                placeholder="Nhập tên miền bạn muốn tìm kiếm..."
                                className="w-full px-6 h-16 focus:outline-none text-gray-700 placeholder-gray-400"
                            />
                            <button className="bg-red-600 hover:bg-red-700 text-white px-6 h-16">
                                <SearchOutlined style={{ fontSize: "20px" }} />
                            </button>
                        </div>
                    </div>

                    <div className="mt-10 w-full max-w-lg">
                        <Slider {...settings}>
                            {domains.map((item, idx) => (
                                <div key={idx} className="px-2">
                                    <div className="flex items-center justify-between rounded-full bg-white shadow px-4 py-2">
                                        <span className="text-sm font-semibold">{item.type}</span>
                                        <span className="mx-2 font-bold">{item.price}</span>
                                        <div className="bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer">
                                            <FaGift size={12} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>

                {/* Cột phải */}
                <div className="relative w-1/2 min-h-screen overflow-hidden">
                    <div
                        className="absolute top-0 right-0 w-full h-full bg-pink-200"
                        style={{ clipPath: "ellipse(75% 100% at 100% 50%)" }}
                    ></div>

                    <div className="relative z-10 flex justify-center items-start pt-20">
                        <div className="w-full max-w-3xl mt-10">
                            <img
                                src={bg2}
                                alt="Kiểm tra tên miền"
                                className="w-full max-w-3xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DomainChecker;
