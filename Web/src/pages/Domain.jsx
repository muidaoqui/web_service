import React, { useEffect, useState } from "react";
import vnLogo from "../assets/vn-lg-3203.svg";
import qtLogo from "../assets/icann-3846.svg";
import { SearchOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaGift } from "react-icons/fa";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Nút mũi tên trái
function PrevArrow(props) {
  return (
    <button
      {...props}
      className="slick-prev absolute z-10 text-red-600 -left-5"
    >
      <MdKeyboardArrowLeft size={24} />
    </button>
  );
}

// Nút mũi tên phải
function NextArrow(props) {
  return (
    <button
      {...props}
      className="slick-next absolute z-10 text-red-600 -right-5"
    >
      <MdKeyboardArrowRight size={24} />
    </button>
  );
}

// Cấu hình slider
const sliderSettings = {
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
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 640, settings: { slidesToShow: 1 } },
  ],
};

function Domain() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch API
  useEffect(() => {
    axios.get("/api/domains")
  .then((res) => {
    console.log("API domains:", res.data);
    setDomains(res.data.data || res.data || []);
  })

      .catch((err) => console.error("Lỗi khi fetch domain:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-10">Đang tải...</p>;

  // chia domain thành 2 nhóm: vn, qt
  const vnDomains = Array.isArray(domains) ? domains.filter((d) => d.type === "vn") : [];
const qtDomains = Array.isArray(domains) ? domains.filter((d) => d.type === "qt") : [];
const sliderDomains = Array.isArray(domains) ? domains.slice(0, 6) : [];


  return (
    <div className="p-4 flex flex-col justify-center items-center text-center bg-gradient-to-b from-red-50 to-white">
      <div className="w-full flex flex-col justify-center items-center my-8">
        {/* Tiêu đề */}
        <h1 className="text-4xl font-bold text-red-600">KIỂM TRA TÊN MIỀN</h1>
        <p className="mt-2 text-base text-gray-700">
          Đăng ký tên miền ngay từ bây giờ để bảo vệ thương hiệu của bạn
        </p>

        {/* Ô search */}
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

        {/* Slider */}
        <div className="mt-10 w-full max-w-lg">
          <Slider {...sliderSettings}>
            {sliderDomains.map((item, idx) => (
              <div key={idx} className="px-2">
                <div className="flex items-center justify-between rounded-full bg-white shadow px-4 py-2">
                  <span className="text-sm font-semibold">{item.name}</span>
                  <span className="mx-2 font-bold text-red-600">
                    {item.newPrice.toLocaleString("vi-VN")}đ
                  </span>
                  <div className="bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer">
                    <FaGift size={12} />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Bảng VN */}
        <div className="w-3/4 mx-auto bg-red-100 p-4 rounded-md shadow-md my-16">
          <div className="grid grid-cols-5 text-sm font-medium border-t border-red-300">
            <div className="col-span-2 flex items-center bg-red-200 p-4 rounded-t-md">
              <img src={vnLogo} alt=".vn logo" className="h-10 mr-4" />
              <h2 className="text-xl font-bold text-red-700">
                BẢNG GIÁ TÊN MIỀN VIỆT NAM
              </h2>
            </div>
            <div className="p-4 bg-red-600 text-white text-center">
              ĐĂNG KÝ MỚI
            </div>
            <div className="p-4 bg-red-600 text-white text-center">GIA HẠN</div>
            <div className="p-4 bg-red-600 text-white text-center">
              CHUYỂN VỀ
            </div>

            {vnDomains.map((domain, index) => (
              <React.Fragment key={domain._id}>
                <div
                  className={`col-span-2 p-2 font-semibold ${
                    index % 2 ? "bg-red-50" : "bg-white"
                  }`}
                >
                  {domain.name}
                </div>
                <div
                  className={`${
                    index % 2 ? "bg-red-50" : "bg-white"
                  } p-2 text-red-600 font-bold`}
                >
                  {domain.newPrice.toLocaleString("vi-VN")}đ
                </div>
                <div
                  className={`${
                    index % 2 ? "bg-red-50" : "bg-white"
                  } p-2 text-gray-700`}
                >
                  {domain.renewPrice.toLocaleString("vi-VN")}đ
                </div>
                <div
                  className={`${
                    index % 2 ? "bg-red-50" : "bg-white"
                  } p-2 text-green-600`}
                >
                  {domain.transfer}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Bảng QT */}
        <div className="w-3/4 mx-auto bg-red-100 p-4 rounded-md shadow-md mb-16">
          <div className="grid grid-cols-5 text-sm font-medium border-t border-red-300">
            <div className="col-span-2 flex items-center bg-red-200 p-4 rounded-t-md">
              <img src={qtLogo} alt=".qt logo" className="h-10 mr-4" />
              <h2 className="text-xl font-bold text-red-700">
                BẢNG GIÁ TÊN MIỀN QUỐC TẾ
              </h2>
            </div>
            <div className="p-4 bg-red-600 text-white text-center">
              ĐĂNG KÝ MỚI
            </div>
            <div className="p-4 bg-red-600 text-white text-center">GIA HẠN</div>
            <div className="p-4 bg-red-600 text-white text-center">
              CHUYỂN VỀ
            </div>

            {qtDomains.map((domain, index) => (
              <React.Fragment key={domain._id}>
                <div
                  className={`col-span-2 p-2 font-semibold ${
                    index % 2 ? "bg-red-50" : "bg-white"
                  }`}
                >
                  {domain.name}
                </div>
                <div
                  className={`${
                    index % 2 ? "bg-red-50" : "bg-white"
                  } p-2 text-red-600 font-bold`}
                >
                  {domain.newPrice.toLocaleString("vi-VN")}đ
                </div>
                <div
                  className={`${
                    index % 2 ? "bg-red-50" : "bg-white"
                  } p-2 text-gray-700`}
                >
                  {domain.renewPrice.toLocaleString("vi-VN")}đ
                </div>
                <div
                  className={`${
                    index % 2 ? "bg-red-50" : "bg-white"
                  } p-2 text-green-600`}
                >
                  {domain.transfer}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Domain;
