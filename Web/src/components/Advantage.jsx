import React from "react";
import bg3 from "../assets/bg3.png";
import bg7 from "../assets/bg7.svg";
import {
    FaHandshake,
    FaDollarSign,
    FaClock,
    FaStar,
    FaHeadset,
} from "react-icons/fa";

const features = [
    {
        icon: <FaDollarSign />,
        title: "Chi phí hợp lý",
        desc: "Nina cung cấp dịch vụ thiết kế website chất lượng, theo yêu cầu với chi phí hợp lý, phù hợp với nhu cầu và ngân sách của từng doanh nghiệp.",
        color: "green-400",
        hoverFrom: "from-green-100",
        hoverTo: "to-green-400",
    },
    {
        icon: <FaHandshake />,
        title: "Tương tác liên tục, kịp thời",
        desc: "Đội ngũ thiết kế của Nina đều là những chuyên gia giàu kinh nghiệm, thường xuyên trao đổi, tương tác để tiếp nhận phản hồi, hiệu chỉnh thiết kế đảm bảo mục tiêu đề ra.",
        color: "orange-400",
        hoverFrom: "from-orange-100",
        hoverTo: "to-orange-400",
    },
    {
        icon: <FaClock />,
        title: "Tiến độ chặt chẽ",
        desc: "Nina có hệ thống quản lý chặt chẽ dự án giúp đảm bảo tiến độ triển khai đúng thời gian.",
        color: "purple-400",
        hoverFrom: "from-purple-100",
        hoverTo: "to-purple-400",
    },
    {
        icon: <FaStar />,
        title: "Chất lượng vượt trội",
        desc: "Nina cung cấp các công nghệ mới, mang đến trải nghiệm tuyệt vời cho khách hàng.",
        color: "lime-500",
        hoverFrom: "from-lime-100",
        hoverTo: "to-lime-400",
    },
    {
        icon: <FaHeadset />,
        title: "Hỗ trợ vận hành",
        desc: "Hỗ trợ và bảo trì liên tục, backup dữ liệu, nâng cấp tính năng và tích hợp các dịch vụ bên ngoài.",
        color: "pink-400",
        hoverFrom: "from-pink-100",
        hoverTo: "to-pink-400",
    },
];

function Advantage() {
    return (
        <div className="relative p-20 shadow-md rounded-lg mt-8 text-center overflow-hidden">
            <img src={bg3} alt="Background" className="absolute inset-0 w-3/4 object-cover z-0" />
            <div className="relative z-10 flex gap-4">
                <div className="w-1/2 flex justify-center flex-col gap-4">
                    <h1 className="text-3xl font-bold text-red-500 text-left w-2/3">
                        ƯU ĐIỂM NỔI BẬT CỦA DỊCH VỤ THIẾT KẾ WEBSITE TẠI MD
                    </h1>
                    <p className="text-gray-700 text-left">
                        Chúng tôi luôn đồng hành cùng khách hàng của mình trong việc xây dựng nền tảng Marketing phù hợp, hướng đến sự nhận diện thương hiệu thật dễ dàng và phát triển đơn hàng một cách bền vững.
                    </p>
                    <img src={bg7} alt="Background" className="mt-8" />
                </div>
                <div className="w-1/2">
                    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                            {features.map((item, index) => (
                                <div
                                    key={index}
                                    className={` bg-white p-6 rounded-lg border shadow-sm transition duration-300 group text-left 
                                    border-${item.color} hover:bg-gradient-to-r ${item.hoverFrom} ${item.hoverTo} hover:text-white duration-300`}
                                >
                                    <div
                                        className={`w-12 h-12 flex items-center justify-center rounded-full 
                                            bg-${item.color.replace("400", "100")} 
                                            text-${item.color} 
                                            border border-${item.color} 
                                            text-xl mb-4 
                                            transition-transform group-hover:scale-110 group-hover:bg-black`}
                                    >
                                        {item.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 group-hover:text-black">{item.title}</h3>
                                    <p className="text-gray-600 text-sm group-hover:text-black">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Advantage;
