import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Stepper from "../../components/common/Stepper";
import Step1Cart from "../../components/pay/Step1Cart";
import Step2UserInfo from "../../components/pay/Step2UserInfo";
import Step3Confirmation from "../../components/pay/Step3Confirmation";
import Step4Contract from "../../components/pay/Step4Contract";
import Step5Payment from "../../components/pay/Step5Payment";
import OrderSummary from "../../components/pay/OrderSummary";

const steps = ["Giỏ hàng", "Nhập thông tin", "Xác nhận", "Hợp đồng", "Thanh toán"];

function Pay() {
    const location = useLocation();
    const navigate = useNavigate();

    const plan = location.state?.plan || {
        name: "Gói 12GB",
        price: 8812800,
        yearly: 8812800,
        _id: "id"
    };

    const initialYear = location.state?.selectedYear || 1;
    const [selectedYear, setSelectedYear] = useState(initialYear);
    const [activeStep, setActiveStep] = useState(1);
    const [employeeCode, setEmployeeCode] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const [userLoading, setUserLoading] = useState(false);
    const [userError, setUserError] = useState("");
    const [userForm, setUserForm] = useState({ name: "", email: "", phone: "", address: "" });
    const [userUpdateLoading, setUserUpdateLoading] = useState(false);

    const cleanedString = String(plan.yearly).replace(/[^0-9]/g, '');
    const yearlyPrice = Number(cleanedString) || 0;

    const getDiscountPrice = (years) => {
        if (plan.pricesByYear && plan.pricesByYear[years]) {
            return plan.pricesByYear[years];
        }
        if (years === 1) return yearlyPrice;
        if (years === 2) return Math.round(yearlyPrice * 1.8);
        if (years === 3) return Math.round(yearlyPrice * 2.5);
        return yearlyPrice * years;
    };

    useEffect(() => {
        if (activeStep === 2 && !userInfo) {
            setUserLoading(true);
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

    const handleUpdateAndNext = () => {
        setUserUpdateLoading(true);
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
    };

    const renderStepContent = () => {
        switch (activeStep) {
            case 1:
                return (
                    <Step1Cart
                        plan={plan}
                        selectedYear={selectedYear}
                        setSelectedYear={setSelectedYear}
                        getDiscountPrice={getDiscountPrice}
                        onNext={() => setActiveStep(2)}
                    />
                );
            case 2:
                return userLoading ? (
                    <p className="text-center py-10">Đang tải thông tin người dùng...</p>
                ) : userError ? (
                    <p className="text-red-500">{userError}</p>
                ) : (
                    <Step2UserInfo
                        plan={plan}
                        selectedYear={selectedYear}
                        getDiscountPrice={getDiscountPrice}
                        userForm={userForm}
                        setUserForm={setUserForm}
                        onBack={() => setActiveStep(1)}
                        onUpdateAndNext={handleUpdateAndNext}
                        loading={userUpdateLoading}
                    />
                );
            case 3:
                return (
                    <Step3Confirmation
                        plan={plan}
                        selectedYear={selectedYear}
                        getDiscountPrice={getDiscountPrice}
                        userForm={userForm}
                        employeeCode={employeeCode}
                        onBack={() => setActiveStep(2)}
                        onNext={() => setActiveStep(4)}
                    />
                );
            case 4: // Thêm case mới cho Step 4
                return (
                    <Step4Contract
                        plan={plan}
                        selectedYear={selectedYear}
                        getDiscountPrice={getDiscountPrice}
                        userForm={userForm}
                        employeeCode={employeeCode}
                        onBack={() => setActiveStep(3)}
                        onNext={() => setActiveStep(5)}
                    />
                );
            case 5: // Thêm case mới cho Step 5
                return (
                    <Step5Payment
                        plan={plan}
                        selectedYear={selectedYear}
                        getDiscountPrice={getDiscountPrice} 
                        userForm={userForm}
                        employeeCode={employeeCode}
                        onBack={() => setActiveStep(4)}
                    />
                );
            default:
                // Các bước còn lại
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
                        <OrderSummary 
                            plan={plan} 
                            selectedYear={selectedYear} 
                            getDiscountPrice={getDiscountPrice} 
                        />
                    </div>
                );
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10">
            <Stepper steps={steps} activeStep={activeStep} />
            {renderStepContent()}
        </div>
    );
}

export default Pay;