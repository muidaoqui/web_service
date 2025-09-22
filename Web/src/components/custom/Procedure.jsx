import React from "react";
import bg3 from "../../assets/bg3.png";
import {
    FaLightbulb,
    FaPaintBrush,
    FaCheckSquare,
    FaCode,
    FaClipboardCheck,
} from "react-icons/fa";

const steps = [
    { title: "Tư vấn khách hàng", icon: <FaLightbulb size={30} /> },
    { title: "Thiết kế giao diện", icon: <FaPaintBrush size={30} /> },
    { title: "Khách hàng duyệt giao diện", icon: <FaCheckSquare size={30} /> },
    { title: "Triển khai dự án", icon: <FaCode size={30} /> },
    { title: "Nghiệm thu bàn giao", icon: <FaClipboardCheck size={30} /> },
];

const marginTops = ["mt-0", "mt-10", "mt-5", "mt-12", "mt-4"];
function Procedure() {

    return (
        <div className="relative mx-auto p-6 bg-gradient-to-b from-white to-gray-100  mt-8 text-center overflow-hidden">
            <img src={bg3} alt="Background" className="absolute inset-0 w-3/4 object-cover z-0" />
            <div className="relative z-10">
                <h1 className="text-3xl font-bold my-4 text-red-500">QUY TRÌNH THIẾT KẾ WEBSITE</h1>
                <p className="text-gray-600">Chỉ với 5 bước đơn giản dưới đây bạn đã sở hữu một website chuyên nghiệp.</p>
                <div>
                    <div className="relative px-10 py-24  overflow-hidden">
                        {/* SVG curve line */}
                        <svg
                            viewBox="0 0 1000 100"
                            preserveAspectRatio="none"
                            className="absolute top-[200px] left-0 w-full h-[100px] z-0 animate-dash"
                        >
                            <path
                                d="
                M0,50 
                C100,10 200,90 300,50 
                S500,10 600,50 
                S800,90 900,50 
                S1000,10 1100,50
            "
                                fill="none"
                                stroke="#f87171"
                                strokeWidth="3"
                                strokeDasharray="10 10"
                            />
                        </svg>

                        <div className="relative z-10 flex justify-between items-start flex-wrap gap-y-6">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col items-center text-center group w-48 ${marginTops[index]}`}
                                >
                                    <div className="text-3xl font-bold text-red-700 mb-2">{`0${index + 1}`}</div>

                                    <div className="relative rounded-full w-40 h-40 flex items-center justify-center 
                                bg-white shadow-lg overflow-hidden group hover:shadow-xl transition-transform transform hover:scale-105">
                                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 
                                transform -translate-x-full group-hover:translate-x-0 
                                transition-transform duration-500 ease-in-out z-0" />
                                        <div className="relative z-10 flex flex-col items-center px-4 text-center text-black group-hover:text-white">
                                            <div className="mb-2">{step.icon}</div>
                                            <span className="font-semibold text-sm">{step.title}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Procedure;
