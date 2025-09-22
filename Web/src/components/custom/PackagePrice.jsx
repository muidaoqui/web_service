import React from "react";

function PackagePrice() {
    const plans = [
        {
            title: "Gói cơ bản 01",
            color: "text-orange-500",
            bg: "bg-gradient-to-r from-orange-300 to-orange-500 ",
            border: "border-orange-500",
            button: "bg-gradient-to-r from-orange-300 to-orange-500",
            features: [
                "Website cơ bản",
                "Tìm kiếm cơ bản",
                "Tối ưu link",
                "Đăng ký nhận tin",
                "Popup quảng cáo",
                "Đóng dấu hình ảnh",
                "Nút gọi điện, chat zalo/facebook",
            ],
            missing: ["Google dịch", "Mục lục bài viết/Sản phẩm", "Mobile / Responsive"],
        },
        {
            title: "Gói cơ bản 02",
            color: "text-teal-600",
            bg: "bg-gradient-to-r from-teal-300 to-teal-600",
            border: "border-teal-600",
            button: "bg-gradient-to-r from-teal-300 to-teal-600",
            features: [
                "Website cơ bản",
                "Tìm kiếm cơ bản",
                "Tối ưu link",
                "Đăng ký nhận tin",
                "Popup quảng cáo",
                "Đóng dấu hình ảnh",
                "Nút gọi điện, chat zalo/facebook",
                "Google dịch",
                "Mục lục bài viết/Sản phẩm",
            ],
            missing: ["Mobile / Responsive"],
        },
        {
            title: "Gói cơ bản 03",
            color: "text-purple-600",
            bg: "bg-gradient-to-r from-purple-300 to-purple-600",
            border: "border-purple-600",
            button: "bg-gradient-to-r from-purple-300 to-purple-600",
            features: [
                "Website cơ bản",
                "Tìm kiếm cơ bản",
                "Tối ưu link",
                "Đăng ký nhận tin",
                "Popup quảng cáo",
                "Đóng dấu hình ảnh",
                "Nút gọi điện, chat zalo/facebook",
                "Google dịch",
                "Mục lục bài viết/Sản phẩm",
                "Mobile / Responsive",
            ],
            missing: [],
        },
    ];

    return (
        <div className="bg-gray-100 py-12 min-h-screen ">
            <h1 className="text-3xl font-bold text-center text-red-500 mb-6">
                BẢNG GIÁ THIẾT KẾ WEB TRỌN GÓI
            </h1>
            <p className="text-center text-gray-700 mb-8 px-4 max-w-4xl mx-auto">
                Tạo website chuyên nghiệp với giao diện đẹp mắt, hỗ trợ mua sắm online tiện lợi sẽ khiến
                cho khách hàng yêu quý, tin tưởng hơn vào sản phẩm và thương hiệu của bạn.
            </p>
            <div className="flex flex-col items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full px-4">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`border-2 rounded-xl shadow-md bg-white flex flex-col justify-between hover:shadow-xl transition hover:scale-[1.02] duration-200 ${plan.border}`}
                        >
                            {/* Tiêu đề */}
                            <div className={`text-center py-4 text-xl font-bold ${plan.color}`}>
                                {plan.title}
                            </div>

                            {/* Giá */}
                            <div className={`${plan.bg} text-center py-2 font-bold text-lg text-white bg-opacity-80`}>
                                Giá: LIÊN HỆ
                            </div>

                            {/* Danh sách tính năng */}
                            <ul className="p-6 space-y-2 flex-1">
                                {plan.features.map((f, i) => (
                                    <li key={i} className="text-green-600 flex items-center border-b border-gray-200 pb-2">
                                        <span className="mr-2">✔</span>
                                        {f}
                                    </li>
                                ))}
                                {plan.missing.map((f, i) => (
                                    <li key={i} className="text-red-500 flex items-center border-b border-gray-200 pb-2 line-through">
                                        <span className="mr-2">✘</span>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            {/* Nút đăng ký */}
                            <button className={`${plan.button} text-white py-2 font-semibold rounded-b-xl`}>
                                ✈ ĐĂNG KÝ NGAY
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PackagePrice;
