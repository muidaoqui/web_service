import React, { useState } from "react";
import axios from "axios";

const Step5Payment = ({ plan, selectedYear, getDiscountPrice, employeeCode, onBack, onSuccess }) => {
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
            await axios.post("/api/orders", {
                items: [
                    {
                        productType: "hosting",
                        productId: plan._id,
                        name: plan.name,
                        price: getDiscountPrice(selectedYear),
                        quantity: 1,
                        duration: selectedYear,
                        extra: { employeeCode }
                    }
                ],
                paymentMethod
            }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setOrderSuccess(true);
            if (onSuccess) onSuccess();
        } catch (err) {
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
                        <label>
                            <input type="radio" name="paymentMethod" value="bank" checked={paymentMethod === "bank"} onChange={e => setPaymentMethod(e.target.value)} />
                            <span className="ml-1">Chuyển khoản ngân hàng</span>
                        </label>
                        <label>
                            <input type="radio" name="paymentMethod" value="momo" checked={paymentMethod === "momo"} onChange={e => setPaymentMethod(e.target.value)} />
                            <span className="ml-1">Momo</span>
                        </label>
                        <label>
                            <input type="radio" name="paymentMethod" value="paypal" checked={paymentMethod === "paypal"} onChange={e => setPaymentMethod(e.target.value)} />
                            <span className="ml-1">Paypal</span>
                        </label>
                        <label>
                            <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === "cod"} onChange={e => setPaymentMethod(e.target.value)} />
                            <span className="ml-1">COD</span>
                        </label>
                    </div>
                </div>
                {orderSuccess ? (
                    <div className="text-green-600 font-bold mb-4">Đặt hàng thành công! Cảm ơn bạn.</div>
                ) : (
                    <>
                        {orderError && <div className="text-red-500 mb-4">{orderError}</div>}
                        <button className="bg-gray-300 px-4 py-2 rounded" onClick={onBack}>Quay lại</button>
                        <button
                            className="bg-green-600 text-white px-4 py-2 rounded"
                            onClick={() => { handleCreateOrder(); setTimeout(() => { window.location.href = "/"; }, 3000); }}
                            disabled={orderLoading}
                        >
                            {orderLoading ? "Đang xử lý..." : "Xác nhận thanh toán"}
                        </button>
                    </>
                )}
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
};

export default Step5Payment;
