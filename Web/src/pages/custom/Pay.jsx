import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


const steps = [
    "Giỏ hàng",
    "Nhập thông tin",
    "Xác nhận",
    "Hợp đồng",
    "Thanh toán"
];

function Pay() {
    const location = useLocation();
    const navigate = useNavigate();
    // Giả sử nhận data từ HostingOrder
    const plan = location.state?.plan || {
        name: "Gói 12GB",
        price: 8812800,
        yearly: 8812800,
        _id: "id"
    };
    // Lấy selectedYear từ HostingOrder nếu có
    const initialYear = location.state?.selectedYear || 1;
    const [selectedYear, setSelectedYear] = useState(initialYear);
    const [activeStep, setActiveStep] = useState(1);
    const [employeeCode, setEmployeeCode] = useState("");
    const cleanedString = String(plan.yearly).replace(/[^0-9]/g, '');
    const yearlyPrice = Number(cleanedString);

    // Tính giá theo số năm đăng ký
    const getDiscountPrice = (years) => {
        const yearly = yearlyPrice || 0;
        // Nếu plan có mảng giá cho từng năm, dùng giá đó
        if (plan.pricesByYear && plan.pricesByYear[years]) {
            return plan.pricesByYear[years];
        }
        // Mặc định: 1 năm = yearly, 2 năm = yearly * 1.8, 3 năm = yearly * 2.5
        if (years === 1) return yearly;
        if (years === 2) return Math.round(yearly * 1.8);
        if (years === 3) return Math.round(yearly * 2.5);
        return yearly * years;
    };

    // Stepper UI
    const renderStepper = () => (
        <div className="flex items-center justify-between mb-8">
            {steps.map((step, idx) => (
                <div key={step} className="flex-1 flex flex-col items-center">
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white mb-1
              ${activeStep === idx + 1 ? "bg-green-600" : "bg-gray-300"}`}
                    >
                        {idx + 1}
                    </div>
                    <span className={`text-sm font-semibold ${activeStep === idx + 1 ? "text-green-600" : "text-gray-500"}`}>{step}</span>
                </div>
            ))}
        </div>
    );

    // Giỏ hàng step
    const renderCart = () => (
        <div>
            <div className="mb-4 text-lg font-bold text-green-700">Còn 1 xíu nữa thôi, bạn đã có thể bắt đầu kinh doanh.</div>
            <div className="bg-green-100 border border-green-300 rounded p-3 mb-4 text-green-700 font-semibold">
                Hãy chọn dịch vụ bạn muốn thanh toán!
            </div>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 bg-white rounded shadow p-6">
                    <div className="flex items-center mb-2">
                        <input type="checkbox" checked readOnly className="accent-green-600 mr-2" />
                        <span className="font-bold text-lg">{plan.name}</span>
                        <span className="ml-auto font-bold text-green-700">{getDiscountPrice(selectedYear).toLocaleString()}đ</span>
                        <button className="ml-4 text-gray-400 hover:text-red-500" title="Xóa"><span>🗑️</span></button>
                    </div>
                    <div className="mt-2">
                        <select
                            className="border rounded px-2 py-1"
                            value={selectedYear}
                            onChange={e => setSelectedYear(Number(e.target.value))}
                        >
                            <option value={1}>1 năm</option>
                            <option value={2}>2 năm</option>
                            <option value={3}>3 năm</option>
                        </select>
                    </div>
                </div>
                {/* Tóm tắt đơn hàng */}
                <div className="w-full md:w-80 bg-white rounded shadow p-6">
                    <div className="font-bold mb-2">Tóm tắt đơn hàng</div>
                    <div className="flex justify-between mb-1">
                        <span>Hosting</span>
                        <span>{plan.name}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                        <span>Tạm tính</span>
                        <span>{getDiscountPrice(selectedYear).toLocaleString()}đ</span>
                    </div>
                    <div className="flex justify-between mb-1">
                        <span>Tổng tiền trước VAT</span>
                        <span>{getDiscountPrice(selectedYear).toLocaleString()}đ</span>
                    </div>
                    <div className="flex justify-between mb-1">
                        <span>VAT</span>
                        <span>Liên hệ</span>
                    </div>
                    <div className="flex justify-between mb-1 font-bold text-red-600">
                        <span>Thành tiền</span>
                        <span>{getDiscountPrice(selectedYear).toLocaleString()}đ</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Đã bao gồm VAT</div>
                </div>
            </div>
            {/* Nhân viên tư vấn */}
            <div className="w-full md:w-80 bg-white rounded shadow p-6 mt-4">
                <div className="font-bold mb-2">Nhân viên tư vấn</div>
                <input
                    type="text"
                    className="border rounded px-2 py-1 w-full mb-2"
                    placeholder="Mã nhân viên"
                    value={employeeCode}
                    onChange={e => setEmployeeCode(e.target.value)}
                />
                <button className="bg-gray-200 px-3 py-1 rounded">Cập nhật</button>
            </div>
            <button
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold mt-6 hover:bg-green-700 transition-all"
                onClick={() => setActiveStep(2)}
            >
                Tiếp tục thanh toán
            </button>
        </div>
    );

    // Step 2: Nhập thông tin người dùng
    const [userInfo, setUserInfo] = useState(null);
    const [userLoading, setUserLoading] = useState(false);
    const [userError, setUserError] = useState("");
    const [userForm, setUserForm] = useState({ name: "", email: "", phone: "", address: "" });
    const [userUpdateLoading, setUserUpdateLoading] = useState(false);

    React.useEffect(() => {
        if (activeStep === 2 && !userInfo) {
            setUserLoading(true);
            setUserError("");
            // Lấy accessToken từ localStorage nếu có
            const accessToken = localStorage.getItem("accessToken");
            axios.get("/api/users/me", { headers: { Authorization: `Bearer ${accessToken}` } })
                .then(res => {
                    setUserInfo(res.data);
                    setUserForm({
                        name: res.data.name || "",
                        email: res.data.email || "",
                        phone: res.data.phone || "",
                        address: res.data.address || ""
                    });
                })
                .catch(err => {
                    setUserError("Không lấy được thông tin người dùng");
                })
                .finally(() => setUserLoading(false));
        }
    }, [activeStep, userInfo]);

        const renderStepContent = () => {
            if (activeStep === 1) return renderCart();
            if (activeStep === 2) {
                if (userLoading) return <p className="text-center py-10">Đang tải thông tin người dùng...</p>;
                if (userError) return <p className="text-red-500">{userError}</p>;
                if (!userInfo) return null; // Chưa có dữ liệu
                return (
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 bg-white rounded shadow p-6">
                            <h2 className="text-xl font-bold mb-4 text-green-700">Nhập thông tin khách hàng</h2>
                            <div className="mb-4">  
                                <label className="block mb-2 font-semibold">Họ và tên</label>
                                <input
                                    type="text"
                                    className="border rounded px-2 py-1 w-full"
                                    value={userForm.name}
                                    onChange={e => setUserForm({ ...userForm, name: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">Email</label>
                                <input
                                    type="email"
                                    className="border rounded px-2 py-1 w-full"
                                    value={userForm.email}
                                    onChange={e => setUserForm({ ...userForm, email: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">Số điện thoại</label>
                                <input
                                    type="text"
                                    className="border rounded px-2 py-1 w-full"
                                    value={userForm.phone}
                                    onChange={e => setUserForm({ ...userForm, phone: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">Địa chỉ</label>
                                <input
                                    type="text"
                                    className="border rounded px-2 py-1 w-full"
                                    value={userForm.address}
                                    onChange={e => setUserForm({ ...userForm, address: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-2 mt-4">
                                <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setActiveStep(1)}>Quay lại</button>
                                <button
                                    className="bg-green-600 text-white px-4 py-2 rounded"
                                    onClick={() => {
                                        setUserUpdateLoading(true);
                                        // Gọi API cập nhật thông tin người dùng
                                        const accessToken = localStorage.getItem("accessToken");
                                        axios.put("/api/users/me", userForm, { headers: { Authorization: `Bearer ${accessToken}` } })
                                            .then(res => {
                                                setUserInfo(res.data);
                                                setActiveStep(3);
                                            })
                                            .catch(err => {
                                                alert("Cập nhật thông tin thất bại");
                                            })
                                            .finally(() => setUserUpdateLoading(false));
                                    }}
                                >
                                    {userUpdateLoading ? "Đang cập nhật..." : "Cập nhật"}
                                </button>
                            </div>
                        </div>
                        {/* Tóm tắt đơn hàng giống step 1 */}
                        <div className="w-full md:w-80 bg-white rounded shadow p-6">
                            <div className="font-bold mb-2">Tóm tắt đơn hàng</div>
                            <div className="flex justify-between mb-1">
                                <span>Hosting</span>
                                <span>{plan.name}</span>
                            </div>
                            <div className="flex justify-between mb-1">
                                <span>Tạm tính</span>
                                <span>{getDiscountPrice(selectedYear).toLocaleString()}đ</span>
                            </div>
                            <div className="flex justify-between mb-1">
                                <span>Tổng tiền trước VAT</span>
                                <span>{getDiscountPrice(selectedYear).toLocaleString()}đ</span>
                            </div>
                            <div className="flex justify-between mb-1">
                                <span>VAT</span>
                                <span>Liên hệ</span>
                            </div>
                            <div className="flex justify-between mb-1 font-bold text-red-600">
                                <span>Thành tiền</span>
                                <span>{getDiscountPrice(selectedYear).toLocaleString()}đ</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Đã bao gồm VAT</div>
                        </div>
                    </div>
                    );
                }
                if (activeStep === 3) {
                    return (
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 bg-white rounded shadow p-6">
                            <h2 className="text-xl font-bold mb-4 text-green-700">Xác nhận thông tin đơn hàng</h2>
                            <div className="mb-4">
                                <div className="font-semibold mb-2">Thông tin dịch vụ:</div>
                                <div>Gói Hosting: <b>{plan.name}</b></div>
                                <div>Số năm đăng ký: <b>{selectedYear}</b></div>
                                <div>Giá: <b>{getDiscountPrice(selectedYear).toLocaleString()}đ</b></div>
                            </div>
                            <div className="mb-4">
                                <div className="font-semibold mb-2">Thông tin khách hàng:</div>
                                <div>Họ tên: <b>{userForm.name}</b></div>
                                <div>Email: <b>{userForm.email}</b></div>
                                <div>Điện thoại: <b>{userForm.phone}</b></div>
                                <div>Địa chỉ: <b>{userForm.address}</b></div>
                            </div>
                            <div className="mb-4">
                                <div className="font-semibold mb-2">Mã nhân viên tư vấn:</div>
                                <div><b>{employeeCode || "Chưa nhập"}</b></div>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setActiveStep(2)}>Quay lại</button>
                                <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => setActiveStep(4)}>
                                    Xác nhận & Tiếp tục
                                </button>
                            </div>
                        </div>
                        {/* Tóm tắt đơn hàng giống các bước trước */}
                        <div className="w-full md:w-80 bg-white rounded shadow p-6">
                            <div className="font-bold mb-2">Tóm tắt đơn hàng</div>
                            <div className="flex justify-between mb-1">
                                <span>Hosting</span>
                                <span>{plan.name}</span>
                            </div>
                            <div className="flex justify-between mb-1">
                                <span>Tạm tính</span>
                                <span>{getDiscountPrice(selectedYear).toLocaleString()}đ</span>
                            </div>
                            <div className="flex justify-between mb-1">
                                <span>Tổng tiền trước VAT</span>
                                <span>{getDiscountPrice(selectedYear).toLocaleString()}đ</span>
                            </div>
                            <div className="flex justify-between mb-1">
                                <span>VAT</span>
                                <span>Liên hệ</span>
                            </div>
                            <div className="flex justify-between mb-1 font-bold text-red-600">
                                <span>Thành tiền</span>
                                <span>{getDiscountPrice(selectedYear).toLocaleString()}đ</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Đã bao gồm VAT</div>
                        </div>
                    </div>
                );
            }
            // Các bước còn lại cũng dùng card và tóm tắt đơn hàng
            return (
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 bg-white rounded shadow p-6 text-center">
                        <h2 className="text-xl font-bold mb-4 text-green-700">Bước {activeStep}: {steps[activeStep - 1]}</h2>
                        <div className="mb-4">(Nội dung sẽ bổ sung sau)</div>
                        <div className="flex gap-2 mt-4 justify-center">
                            {activeStep > 1 && (
                                <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setActiveStep(activeStep - 1)}>Quay lại</button>
                            )}
                            {activeStep < 5 && (
                                <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => setActiveStep(activeStep + 1)}>Tiếp tục</button>
                            )}
                        </div>
                    </div>
                    {/* Tóm tắt đơn hàng giống step 1 */}
                    <div className="w-full md:w-80 bg-white rounded shadow p-6">
                        <div className="font-bold mb-2">Tóm tắt đơn hàng</div>
                        <div className="flex justify-between mb-1">
                            <span>Hosting</span>
                            <span>{plan.name}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                            <span>Tạm tính</span>
                            <span>{getDiscountPrice(selectedYear).toLocaleString()}đ</span>
                        </div>
                        <div className="flex justify-between mb-1">
                            <span>Tổng tiền trước VAT</span>
                            <span>{getDiscountPrice(selectedYear).toLocaleString()}đ</span>
                        </div>
                        <div className="flex justify-between mb-1">
                            <span>VAT</span>
                            <span>Liên hệ</span>
                        </div>
                        <div className="flex justify-between mb-1 font-bold text-red-600">
                            <span>Thành tiền</span>
                            <span>{getDiscountPrice(selectedYear).toLocaleString()}đ</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Đã bao gồm VAT</div>
                    </div>
                </div>
            );
        };

        return (
            <div className="max-w-4xl mx-auto py-10">
                {renderStepper()}
                {renderStepContent()}
            </div>
        );
}

export default Pay;
