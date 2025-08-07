import React from "react";
import vnLogo from "../assets/vn-lg-3203.svg"
import qtLogo from "../assets/icann-3846.svg"
import { SearchOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { FaGlobe, FaShieldAlt, FaCloud, FaSearch, FaLock, FaCheckCircle } from 'react-icons/fa';
import { FaGift } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const benefits = [
    {
        icon: <FaShieldAlt className="text-blue-500 text-4xl mb-4" />,
        title: 'Quản Lý Tên Miền',
        desc: 'Bạn hoàn toàn chủ động trong việc quản lý và gia hạn dịch vụ tên miền thông qua giao diện web trực quan do chúng tôi cung cấp mà không phải chờ đợi.',
    },
    {
        icon: <FaCloud className="text-blue-500 text-4xl mb-4" />,
        title: 'Quản Lý DNS',
        desc: 'Tính năng DNS trung gian được tích hợp sẵn với giao diện quản lý giúp bạn đơn giản hóa quá trình cài đặt và cập nhật cấu hình bản ghi cho tên miền nhanh chóng.',
    },
    {
        icon: <FaShieldAlt className="text-blue-500 text-4xl mb-4" />,
        title: 'An Toàn Pháp Lý',
        desc: 'Đăng ký tên miền tại nhà đăng ký Việt Nam giúp hạn chế những rủi ro về mặt pháp lý, như xảy ra tranh chấp thương hiệu hoặc thiếu chứng từ hợp đồng hóa đơn.',
    },
    {
        icon: <FaGlobe className="text-green-500 text-4xl mb-4" />,
        title: 'Tốt Cho SEO',
        desc: 'Theo Google chia sẻ, các doanh nghiệp nên đăng ký tên miền .VN tại địa phương nhằm tăng tính nhận diện vùng hoạt động để bổ trợ cho thứ hạng tìm kiếm trên SEO.',
    },
    {
        icon: <FaSearch className="text-blue-500 text-4xl mb-4" />,
        title: 'Uy Tín Thương Hiệu',
        desc: 'Việc sở hữu tên miền .VN giúp tăng tính nhận diện thương hiệu và mức độ uy tín doanh nghiệp của bạn với khách hàng tại Việt Nam cũng như đối tác quốc tế.',
    },
    {
        icon: <FaCheckCircle className="text-green-500 text-4xl mb-4" />,
        title: 'Ẩn Thông Tin Tên Miền',
        desc: 'Với dịch vụ ID Protection này giúp bạn ẩn các thông tin tên miền quan trọng tránh khỏi sự nhòm ngó của những cá nhân hay tổ chức chuyên đi spam người dùng.',
    },
];

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

function Domain() {
    const domainsvn = [
        { name: ".VN", newPrice: "820.000đ", renewPrice: "479.000đ", transfer: "Miễn phí" },
        { name: ".COM.VN", newPrice: "691.000đ", renewPrice: "349.000đ", transfer: "Miễn phí" },
        { name: ".EDU.VN", newPrice: "397.000đ", renewPrice: "199.000đ", transfer: "Miễn phí" },
        { name: ".GOV.VN", newPrice: "397.000đ", renewPrice: "199.000đ", transfer: "Miễn phí" },
        { name: ".NET.VN", newPrice: "691.000đ", renewPrice: "349.000đ", transfer: "Miễn phí" },
        { name: ".INFO.VN", newPrice: "397.000đ", renewPrice: "199.000đ", transfer: "Miễn phí" },
    ];
    const domainsqt = [
        { name: ".COM", newPrice: "691.000đ", renewPrice: "349.000đ", transfer: "Miễn phí" },
        { name: ".EDU", newPrice: "397.000đ", renewPrice: "199.000đ", transfer: "Miễn phí" },
        { name: ".GOV", newPrice: "397.000đ", renewPrice: "199.000đ", transfer: "Miễn phí" },
        { name: ".NET", newPrice: "691.000đ", renewPrice: "349.000đ", transfer: "Miễn phí" },
        { name: ".INFO", newPrice: "397.000đ", renewPrice: "199.000đ", transfer: "Miễn phí" },
    ];
    return (
        <div className="p-4 flex flex-col justify-center items-center text-center bg-gradient-to-b from-red-50 to-white">
            <div className="w-full flex flex-col justify-center items-center my-8">
                <h1 className="text-4xl font-bold text-red-600">KIỂM TRA TÊN MIỀN</h1>
                <p className="mt-2 text-base text-gray-700">
                    Đăng ký tên miền ngay từ bây giờ để bảo vệ thương hiệu của bạn
                </p>

                <div className="mt-10 w-full max-w-3xl">
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
                <div className="w-3/4 mx-auto bg-red-100 p-4 rounded-md shadow-md my-16">
                    {/* Header */}


                    {/* Table */}
                    <div className="grid grid-cols-5 text-sm font-medium border-t border-red-300">

                        {/* Cột 1 + 2 gộp lại */}
                        <div className="col-span-2 flex items-center bg-red-200 p-4 rounded-t-md">
                            <img src={vnLogo} alt=".vn logo" className="h-10 mr-4" />
                            <h2 className="text-xl font-bold text-red-700">BẢNG GIÁ TÊN MIỀN VIỆT NAM</h2>
                        </div>

                        {/* Cột 3 */}
                        <div className="p-4 bg-red-600 text-white text-center rounded-tr-md">
                            ĐĂNG KÝ MỚI<br />
                            <span className="text-xs">(đã bao gồm VAT)</span>
                        </div>

                        {/* Cột 4 */}
                        <div className="p-4 bg-red-600 text-white text-center rounded-tr-md">
                            GIA HẠN<br />
                            <span className="text-xs">(đã bao gồm VAT)</span>
                        </div>
                        <div className="p-4 bg-red-600 text-white text-center rounded-tr-md">
                            CHUYỂN VỀ MD<br />
                            <span className="text-xs">(đã bao gồm VAT)</span>
                        </div>

                        {/* Bắt đầu từ dòng thứ 2 (hàng dữ liệu) */}
                        {domainsvn.map((domain, index) => (
                            <React.Fragment key={domain.name}>
                                <div className={`col-span-2 p-2 font-semibold ${index % 2 ? 'bg-red-50' : 'bg-white'}`}>{domain.name}</div>
                                <div className={`p-2 ${index % 2 ? 'bg-red-50' : 'bg-white'}`}>{domain.newPrice}</div>
                                <div className={`p-2 ${index % 2 ? 'bg-red-50' : 'bg-white'}`}>{domain.renewPrice}</div>
                                <div className={`p-2 ${index % 2 ? 'bg-red-50' : 'bg-white'}`}>
                                    <div className={`p-2 ${index % 2 ? 'bg-red-50' : 'bg-white'}`}>{domain.transfer}</div>

                                    {index === 5 && (
                                        <button className=" mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full">
                                            ĐĂNG KÝ
                                        </button>
                                    )}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>

                </div>
                <div className="w-3/4 mx-auto bg-red-100 p-4 rounded-md shadow-md mb-16">
                    <div className="grid grid-cols-5 text-sm font-medium border-t border-red-300">

                        {/* Cột 1 + 2 gộp lại */}
                        <div className="col-span-2 flex items-center bg-red-200 p-4 rounded-tl-md">
                            <img src={qtLogo} alt=".com logo" className="h-10 mr-4" />
                            <h2 className="text-xl font-bold text-red-700">BẢNG GIÁ TÊN MIỀN QUỐC TẾ</h2>
                        </div>

                        {/* Cột 3 */}
                        <div className="p-4 bg-red-600 text-white text-center">
                            ĐĂNG KÝ MỚI<br />
                            <span className="text-xs">(đã bao gồm VAT)</span>
                        </div>

                        {/* Cột 4 */}
                        <div className="p-4 bg-red-600 text-white text-center">
                            GIA HẠN<br />
                            <span className="text-xs">(đã bao gồm VAT)</span>
                        </div>

                        {/* Cột 5 */}
                        <div className="p-4 bg-red-600 text-white text-center rounded-tr-md">
                            CHUYỂN VỀ NINA<br />
                            <span className="text-xs">(đã bao gồm VAT)</span>
                        </div>

                        {/* Bắt đầu dữ liệu */}
                        {domainsqt.map((domain, index) => (
                            <React.Fragment key={domain.name}>
                                {/* Cột 1+2: Tên miền */}
                                <div className={`col-span-2 p-4 font-semibold ${index % 2 ? 'bg-red-50' : 'bg-white'}`}>
                                    {domain.name}
                                </div>

                                {/* Cột 3: Đăng ký mới */}
                                <div className={`p-4 font-semibold ${index % 2 ? 'bg-red-50' : 'bg-white'}`}>
                                    {domain.newPrice}
                                </div>

                                {/* Cột 4: Gia hạn */}
                                <div className={`p-4 ${index % 2 ? 'bg-red-50' : 'bg-white'}`}>
                                    {domain.renewPrice}
                                </div>

                                {/* Cột 5: Chuyển về */}
                                <div className={`p-4 ${index % 2 ? 'bg-red-50' : 'bg-white'}`}>
                                    {domain.transfer}
                                    {index === domainsqt.length - 1 && (
                                        <button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            ĐĂNG KÝ
                                        </button>
                                    )}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-8 my-8">
                    <h1 className="text-3xl text-red-500 font-bold">NHỮNG LỢI ÍCH KHI ĐĂNG KÝ TÊN MIỀN TẠI MD</h1>
                    <p>Chúng tôi chuẩn hóa toàn bộ quy trình quản lý tên miền bằng công nghệ để mang đến sự thuận tiện và trải nghiệm tối đa cho khách hàng.</p>
                    <section className=" pb-16">
                        <div className="max-w-6xl mx-auto px-4 text-center">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {benefits.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white rounded-xl p-6 border shadow-md hover:shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:bg-gradient-to-t from-pink-100 to-white duration-300"
                                    >
                                        <div className="flex justify-center">{item.icon}</div>
                                        <h3 className="text-lg font-semibold text-gray-800 mt-2 mb-2">{item.title}</h3>
                                        <p className="text-gray-600 text-sm">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Domain;