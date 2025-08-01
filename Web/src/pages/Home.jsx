import React from "react";
import { AudioOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaTrashAlt } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import bg2 from "../assets/bg2.png";

function PrevArrow(props) {
    return (
        <button
            {...props}
            className="slick-prev z-10 text-red-600 -left-5"
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
            className="slick-next z-10 text-red-600 -right-5"
            aria-label="Next"
        >
            <MdKeyboardArrowRight size={24} />
        </button>
    );
}

function Home() {
    const { Search } = Input;

    const onSearch = (value, _e, info) => {
        console.log(info?.source, value);
    };

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
        autoplaySpeed: 3000, // 3 giây
        pauseOnHover: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div>
            <div className="flex justify-around items-center h-full min-h-screen bg-white">
                <div className="flex flex-col align-center items-center text-center w-1/2 ">
                    <h1 className="text-4xl font-bold text-red-600">
                        KIỂM TRA TÊN MIỀN
                    </h1>
                    <p className="mt-2 text-base text-gray-700">
                        Đăng ký tên miền ngay từ bây giờ để bảo vệ thương hiệu của bạn
                    </p>

                    <div className="mt-10 w-3/4">
                        <div className="flex items-center rounded-full border border-red-500 overflow-hidden">
                            <input
                                type="text"
                                placeholder="Nhập tên miền bạn muốn tìm kiếm..."
                                className="w-3/4 flex-grow px-6 h-20 focus:outline-none text-gray-700 placeholder-gray-400"
                            />
                            <button className="bg-red-600 hover:bg-red-700 text-white w-[12.5%] h-20">
                                <SearchOutlined style={{ fontSize: "20px" }} />
                            </button>
                        </div>
                    </div>

                    {/* Slider */}
                    <div className="mt-8 w-3/4">
                        <Slider {...settings}>
                            {domains.map((item, idx) => (
                                <div key={idx} className="px-2">
                                    <div className="flex items-center justify-between rounded-full bg-white shadow px-4 py-2">
                                        <span className="text-sm font-semibold">{item.type}</span>
                                        <span className="mx-2 font-bold">{item.price}</span>
                                        <div className="bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center">
                                            <FaTrashAlt size={12} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>

                {/* Hình ảnh và nền */}
                <div className="relative w-1/2 min-h-screen overflow-hidden">
                    <div
                        className="absolute top-0 right-0 w-3/4 h-full bg-pink-200"
                        style={{
                            clipPath: "ellipse(75% 100% at 100% 50%)",
                        }}
                    ></div>

                    <div className="relative z-10 flex justify-center items-start pt-20">
                        <div className="w-3/4 max-w-xl">
                            <img
                                src={bg2}
                                alt="Kiểm tra tên miền"
                                className="w-full max-w-3xl mt-10"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>

                </div>
                <div>
                    
                </div>
            </div>
        </div>
    );
}

export default Home;
