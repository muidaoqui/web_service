import React, { useState } from "react";
import axios from "axios";
import OrderSummary from "./OrderSummary";

const Step5Payment = ({ cart, userForm, employeeCode, onBack, onSuccess }) => {
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bank");

  const handleCreateOrder = async () => {
    setOrderLoading(true);
    setOrderError("");
    setOrderSuccess(false);
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.post(
        "/api/orders",
        {
          items: cart,
          paymentMethod,
          employeeCode,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setOrderSuccess(true);
      if (onSuccess) onSuccess();
      setTimeout(() => { window.location.href = "/"; }, 3000);
    } catch {
      setOrderError("Đặt hàng thất bại. Vui lòng thử lại!");
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1 bg-white rounded shadow p-6 text-center">
        <h2 className="text-xl font-bold mb-4 text-green-700">Thanh toán & Đặt hàng</h2>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Chọn hình thức thanh toán:</label>
          <div className="flex justify-center gap-4 mb-2">
            {["bank", "momo", "paypal", "cod"].map((method) => (
              <label key={method}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-1">{method.toUpperCase()}</span>
              </label>
            ))}
          </div>
        </div>
        {orderSuccess ? (
          <div className="text-green-600 font-bold mb-4">
            Đặt hàng thành công! Cảm ơn bạn.
          </div>
        ) : (
          <>
            {orderError && <div className="text-red-500 mb-4">{orderError}</div>}
            <button className="bg-gray-300 px-4 py-2 rounded" onClick={onBack}>
              Quay lại
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={handleCreateOrder}
              disabled={orderLoading}
            >
              {orderLoading ? "Đang xử lý..." : "Xác nhận thanh toán"}
            </button>
          </>
        )}
      </div>

      <OrderSummary cart={cart} />
    </div>
  );
};

export default Step5Payment;
