import React from "react";
import OrderSummary from "./OrderSummary";

const Step3Confirmation = ({ cart, userForm, employeeCode, onBack, onNext }) => (
  <div className="flex flex-col md:flex-row gap-6">
    <div className="flex-1 bg-white rounded shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-green-700">Xác nhận thông tin đơn hàng</h2>

      <div className="mb-4">
        <div className="font-semibold mb-2">Thông tin dịch vụ:</div>
        {cart.map((item, idx) => (
          <div key={idx} className="mb-2">
            {item.productType === "hosting" ? "Hosting" : "Domain"} - {item.name} ({item.duration} năm):{" "}
            <b>{item.price.toLocaleString("vi-VN")}đ</b>
          </div>
        ))}
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
        <button className="bg-gray-300 px-4 py-2 rounded" onClick={onBack}>Quay lại</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={onNext}>
          Xác nhận & Tiếp tục
        </button>
      </div>
    </div>

    <OrderSummary cart={cart} />
  </div>
);

export default Step3Confirmation;
