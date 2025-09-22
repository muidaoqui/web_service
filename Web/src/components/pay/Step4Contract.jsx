import React, { useState } from "react";
import OrderSummary from "./OrderSummary";

const Step4Contract = ({ cart, userForm, employeeCode, onBack, onNext }) => {
  const [agreed, setAgreed] = useState(false);
  const today = new Date().toLocaleDateString("vi-VN");

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1 bg-white rounded shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-green-700">Hợp đồng & Điều khoản dịch vụ</h2>

        <div className="mb-6 border-b pb-4">
          <div className="font-semibold mb-2">Thông tin hợp đồng dịch vụ</div>
          <ul className="list-disc list-inside text-gray-700">
            {cart.map((item, idx) => (
              <li key={idx}>
                {item.productType === "hosting" ? "Hosting" : "Domain"} - {item.name}, {item.duration} năm, {item.price.toLocaleString("vi-VN")}đ
              </li>
            ))}
            <li>Khách hàng: {userForm.name} ({userForm.email})</li>
            <li>Ngày tạo: {today}</li>
          </ul>
        </div>

        <div className="mb-6">
          <div className="font-semibold mb-2">Các điều khoản chung</div>
          <div className="max-h-64 overflow-y-auto bg-gray-50 p-4 border rounded text-sm text-gray-600">
            <p>1. Phạm vi dịch vụ: ...</p>
            <p>2. Thanh toán: ...</p>
            <p>3. Trách nhiệm của khách hàng: ...</p>
            <p>4. Bảo mật: ...</p>
            <p>5. Hủy dịch vụ: ...</p>
            <p>6. Chấm dứt hợp đồng: ...</p>
          </div>
        </div>

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="agreeCheckbox"
            className="mr-2 accent-green-600"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label htmlFor="agreeCheckbox" className="text-gray-700">
            Tôi đã đọc và đồng ý với các điều khoản dịch vụ.
          </label>
        </div>

        <div className="flex gap-2 mt-4">
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onBack}>Quay lại</button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-green-800"
            onClick={onNext}
            disabled={!agreed}
          >
            Tiếp tục thanh toán
          </button>
        </div>
      </div>

      <OrderSummary cart={cart} />
    </div>
  );
};

export default Step4Contract;
