import React, { useState } from "react";
import { Radio, Tabs } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import bg3 from "../../assets/bg3.png";
function HostingPrice() {
    const [size, setSize] = useState("small");

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
        <div className="bg-white rounded-lg shadow-md p-6 w-full text-center">
            <h2 className="text-xl font-bold text-green-700">{plan.name}</h2>
            <p className="text-2xl font-bold text-red-600 mt-2">{plan.price} vnđ/tháng</p>
            <ul className="w-full text-sm text-left mt-4 flex flex-col gap-4">
                <li className="flex justify-between w-full border-b border-black/20 pb-2 backdrop-blur-md">
                    <span>Dung lượng:</span>
                    <span>{plan.dungluong}</span>
                </li>
                <li className="flex justify-between w-full border-b border-black/20 pb-2 backdrop-blur-md">
                    <span>Băng thông:</span>
                    <span>KGH</span>
                </li>
                <li className="flex justify-between w-full border-b border-black/20 pb-2 backdrop-blur-md">
                    <span>Subdomain:</span>
                    <span>{plan.subdomain}</span>
                </li>
                <li className="flex justify-between w-full border-b border-black/20 pb-2 backdrop-blur-md">
                    <span>MySQL:</span>
                    <span>{plan.mysql}</span>
                </li>
                <li className="flex justify-between w-full border-b border-black/20 pb-2 backdrop-blur-md">
                    <span>Địa chỉ Mail:</span>
                    <span>{plan.email}</span>
                </li>
                <li className="flex justify-between w-full border-b border-black/20 pb-2 backdrop-blur-md">
                    <span>Backup:</span>
                    <span>{plan.backup}</span>
                </li>
            </ul>

            <p className="mt-2 text-sm font-semibold mt-4">
                Chi phí/năm: <span className="text-red-500">{plan.yearly}</span>
            </p>
            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
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

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <img
                src={bg3}
                alt="Hosting Background"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="relative z-10 w-full  p-8 ">
                <h1 className="text-3xl font-bold text-center text-red-500">
                    BẢNG GIÁ HOSTING TẠI MD
                </h1>
                <p className="text-lg text-gray-700 mt-4 text-center">
                    Website của bạn sẽ bảo mật, ổn định và nhanh gấp nhiều lần khi sử dụng hosting tại MD
                </p>
                <div className="mt-10 w-full flex justify-center">
                    <div className=" w-3/4 md:w-2/3 lg:w-1/2">
                        <Tabs defaultActiveKey="1" items={tabItems} centered />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default HostingPrice;
