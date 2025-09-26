import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Stepper from "../../components/common/Stepper";
import Step1Cart from "../../components/pay/Step1Cart";
import Step2UserInfo from "../../components/pay/Step2UserInfo";
import Step3Confirmation from "../../components/pay/Step3Confirmation";
import Step4Contract from "../../components/pay/Step4Contract";
import Step5Payment from "../../components/pay/Step5Payment";

const steps = ["Giỏ hàng", "Nhập thông tin", "Xác nhận", "Hợp đồng", "Thanh toán"];

function Pay() {
  const location = useLocation();
  // Nhận cart từ DomainOrder hoặc HostingOrder
  const initialCart = location.state?.cart || [];

  const [cart, setCart] = useState(initialCart);
  const [activeStep, setActiveStep] = useState(1);
  const [employeeCode, setEmployeeCode] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState("");
  const [userForm, setUserForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [userUpdateLoading, setUserUpdateLoading] = useState(false);

  // Tính tổng tiền cart
  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price || 0), 0);
  };

  // Lấy thông tin user khi vào bước 2
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
        .catch(() => {
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
      .catch(() => {
        alert("Cập nhật thông tin thất bại");
      })
      .finally(() => setUserUpdateLoading(false));
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <Step1Cart
            cart={cart}
            setCart={setCart}
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
            cart={cart}
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
            cart={cart}
            userForm={userForm}
            employeeCode={employeeCode}
            onBack={() => setActiveStep(2)}
            onNext={() => setActiveStep(4)}
          />
        );
      case 4:
        return (
          <Step4Contract
            cart={cart}
            userForm={userForm}
            employeeCode={employeeCode}
            onBack={() => setActiveStep(3)}
            onNext={() => setActiveStep(5)}
          />
        );
      case 5:
        return (
          <Step5Payment
            cart={cart}
            userForm={userForm}
            employeeCode={employeeCode}
            onBack={() => setActiveStep(4)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 mt-30">
      <Stepper steps={steps} activeStep={activeStep} />
      {renderStepContent()}
    </div>
  );
}

export default Pay;
