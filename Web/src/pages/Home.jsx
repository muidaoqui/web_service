import React from "react";
import { AudioOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaTrashAlt } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import bg2 from "../assets/bg2.png";
import bg3 from "../assets/bg3.png";
import bg5 from "../assets/bg5.png";
import RotatingDots from "../components/RotatingDots";
import WebHosting from "../assets/WebHosting.png";
import Domain from "../assets/Domain.png";
import Laptop from "../assets/Laptop.png";
import Email from "../assets/Email.png";

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
        <div className="bg-gray-100">
            <div className="flex justify-around items-center h-full min-h-screen ml-20">
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
            <div className="relative min-h-screen flex justify-center items-center overflow-hidden">
                {/* Background image */}
                <img
                    src={bg3}
                    alt="Background"
                    className="absolute inset-0 w-3/4  object-cover z-0"
                />

                {/* Overlay content */}
                <div className="relative z-10 flex w-full min-h-screen">
                    {/* Left: RotatingDots */}
                    <div className="w-1/2 flex items-center justify-center">
                        <RotatingDots />
                    </div>

                    {/* Right: Grid content */}
                    <div className="w-1/2 flex items-center justify-center">
                        <div className="grid grid-cols-2 gap-10 p-10 mr-10">
                            {/* Card 1 */}
                            <div className="flex flex-col items-center gap-4 rounded-lg shadow-lg bg-white/80 p-4">
                                <img src={Laptop} alt="Web Hosting" className="w-16 h-auto" />
                                <h1 className="text-center text-red-500 text-2xl font-bold">Thiết kế Website</h1>
                                <p className="text-center text-gray-600">
                                    Website đầy đủ tính năng chính. Có thể quản trị nội dung qua trang quản trị.
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="flex flex-col items-center gap-4 rounded-lg shadow-lg bg-white/80 p-4">
                                <img src={Domain} alt="Domain" className="w-16 h-auto" />
                                <h1 className="text-center text-red-500 text-2xl font-bold">Tên miền</h1>
                                <p className="text-center text-gray-600">
                                    Domain hỗ trợ đầy đủ các record như A, MX miễn phí qua Control Panel.
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="flex flex-col items-center gap-4 rounded-lg shadow-lg bg-white/80 p-4">
                                <img src={Email} alt="Email" className="w-16 h-auto" />
                                <h1 className="text-center text-red-500 text-2xl font-bold">Email</h1>
                                <p className="text-center text-gray-600">
                                    Giải pháp email cho công ty giao dịch thương mại với nhiều tài khoản.
                                </p>
                            </div>

                            {/* Card 4 */}
                            <div className="flex flex-col items-center gap-4 rounded-lg shadow-lg bg-white/80 p-4">
                                <img src={WebHosting} alt="Web Hosting" className="w-16 h-auto" />
                                <h1 className="text-center text-red-500 text-2xl font-bold">Web Hosting</h1>
                                <p className="text-center text-gray-600">
                                    Cho cá nhân/doanh nghiệp muốn giới thiệu hoặc giao dịch online hiệu quả.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pl-20 gap-10 min-h-screen">
                {/* Phần nội dung bên trái */}
                <div className="md:w-1/2 space-y-6">
                    <h1 className="text-3xl font-bold text-red-600 border-b-2 border-red-600 w-full">BẢNG GIÁ TÊN MIỀN VIỆT NAM</h1>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Tên miền Tiếng Việt nằm trong hệ thống tên miền quốc gia Việt Nam ".vn",
                        thuộc hệ thống tên miền đa ngữ IDNS đã được quốc tế công nhận, là xu thế phát triển
                        của công nghiệp nội dung Internet. Trong đó các ký tự tạo nên tên miền là các ký tự
                        được quy định trong bảng mã tiếng Việt.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-10">
                        <div className="flex justify-between items-center bg-white shadow-lg rounded-lg p-4">
                            <p>.vn</p>
                            <h3 className="font-bold text-red-500">820.000</h3>
                        </div>
                        <div className="flex justify-between items-center bg-white shadow-lg rounded-lg p-4">
                            <p>.com.vn</p>
                            <h3 className="font-bold text-red-500">691.000</h3>
                        </div>
                        <div className="flex justify-between items-center bg-white shadow-lg rounded-lg p-4">
                            <p>.net.vn</p>
                            <h3 className="font-bold text-red-500">691.000</h3>
                        </div>
                        <div className="flex justify-between items-center bg-white shadow-lg rounded-lg p-4">
                            <p>.info.vn</p>
                            <h3 className="font-bold text-red-500">397.000</h3>
                        </div>
                        <div className="flex justify-between items-center bg-white shadow-lg rounded-lg p-4">
                            <p>.biz.vn</p>
                            <h3 className="font-bold text-red-500">1.800.000</h3>
                        </div>
                        <div className="flex justify-between items-center bg-white shadow-lg rounded-lg p-4">
                            <p>.gov.vn</p>
                            <h3 className="font-bold text-red-500">397.000</h3>
                        </div>
                    </div>
                    <div className="mt-16 text-center w-1/2 mx-auto">
                        <h2 className="text-2xl font-bold text-white bg-red-500 p-2 rounded-xl w-full">Xem thêm bảng giá</h2>
                    </div>
                </div>

                {/* Phần ảnh bên phải */}
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

        </div>
    );
}

export default Home;
