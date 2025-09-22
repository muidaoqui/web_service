import React from "react";
import OrderSummary from "./OrderSummary";

const Step1Cart = ({ cart, employeeCode, setEmployeeCode, onNext }) => (
  <div>
    <div className="mb-4 text-lg font-bold text-green-700">
      Còn 1 xíu nữa thôi, bạn đã có thể bắt đầu kinh doanh.
    </div>
    <div className="bg-green-100 border border-green-300 rounded p-3 mb-4 text-green-700 font-semibold">
      Hãy chọn dịch vụ bạn muốn thanh toán!
    </div>

    {cart.map((item, idx) => (
      <div key={idx} className="bg-white rounded shadow p-4 mb-4">
        <div className="flex justify-between items-center">
          <span className="font-bold">
            {item.productType === "hosting" ? "Hosting" : "Domain"} - {item.name}
          </span>
          <span className="text-green-700 font-bold">
            {item.price.toLocaleString("vi-VN")}đ
          </span>
        </div>
        <div className="text-sm text-gray-600">Thời hạn: {item.duration} năm</div>
      </div>
    ))}

    <div className="w-full md:w-80 bg-white rounded shadow p-6 mt-4">
      <div className="font-bold mb-2">Nhân viên tư vấn</div>
      <input
        type="text"
        className="border rounded px-2 py-1 w-full mb-2"
        placeholder="Mã nhân viên"
        value={employeeCode}
        onChange={(e) => setEmployeeCode(e.target.value)}
      />
    </div>

    <button
      className="w-full bg-green-600 text-white py-3 rounded-lg font-bold mt-6 hover:bg-green-700"
      onClick={onNext}
    >
      Tiếp tục thanh toán
    </button>

    <div className="mt-6">
      <OrderSummary cart={cart} />
    </div>
  </div>
);

export default Step1Cart;
