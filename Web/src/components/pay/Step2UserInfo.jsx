import React from "react";
import OrderSummary from "./OrderSummary";

const Step2UserInfo = ({ cart, userForm, setUserForm, onBack, onUpdateAndNext, loading }) => (
  <div className="flex flex-col md:flex-row gap-6">
    <div className="flex-1 bg-white rounded shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-green-700">Nhập thông tin khách hàng</h2>

      {["name", "email", "phone", "address"].map((field) => (
        <div className="mb-4" key={field}>
          <label className="block mb-2 font-semibold">
            {field === "name" ? "Họ và tên" :
              field === "email" ? "Email" :
              field === "phone" ? "Số điện thoại" :
              "Địa chỉ"}
          </label>
          <input
            type={field === "email" ? "email" : "text"}
            className="border rounded px-2 py-1 w-full"
            value={userForm[field]}
            onChange={(e) => setUserForm({ ...userForm, [field]: e.target.value })}
          />
        </div>
      ))}

      <div className="flex gap-2 mt-4">
        <button className="bg-gray-300 px-4 py-2 rounded" onClick={onBack}>Quay lại</button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={onUpdateAndNext}
          disabled={loading}
        >
          {loading ? "Đang cập nhật..." : "Cập nhật"}
        </button>
      </div>
    </div>

    <OrderSummary cart={cart} />
  </div>
);

export default Step2UserInfo;
