import React from "react";

const OrderSummary = ({ cart }) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  const vat = Math.round(subtotal * 0.1); // 10% VAT
  const total = subtotal + vat;

  return (
    <div className="w-full md:w-80 bg-white rounded shadow p-6">
      <div className="font-bold mb-2">Tóm tắt đơn hàng</div>
      {cart.map((item, idx) => (
        <div key={idx} className="mb-3 border-b pb-2">
          <div className="flex justify-between">
            <span className="text-gray-600">
              {item.productType === "hosting" ? "Hosting" : "Domain"}:
            </span>
            <span className="font-semibold">{item.name}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Thời hạn</span>
            <span>{item.duration} năm</span>
          </div>
          <div className="flex justify-between font-bold text-green-700">
            <span>Giá</span>
            <span>{item.price.toLocaleString("vi-VN")}đ</span>
          </div>
        </div>
      ))}
      <div className="flex justify-between mb-1">
        <span>Tạm tính</span>
        <span>{subtotal.toLocaleString("vi-VN")}đ</span>
      </div>
      <div className="flex justify-between mb-1">
        <span>VAT (10%)</span>
        <span>{vat.toLocaleString("vi-VN")}đ</span>
      </div>
      <div className="flex justify-between mb-1 font-bold text-red-600">
        <span>Thành tiền</span>
        <span>{total.toLocaleString("vi-VN")}đ</span>
      </div>
    </div>
  );
};

export default OrderSummary;
