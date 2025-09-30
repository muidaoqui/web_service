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
          <div className="max-h-64 overflow-y-auto bg-gray-50 p-4 border rounded text-sm text-gray-600 space-y-2">
            <p>1. Phạm vi dịch vụ: Người dùng được quyền sử dụng dịch vụ/sản phẩm theo đúng gói đã đăng ký và thanh toán.</p>
            <p>2. Thanh toán: Khách hàng có trách nhiệm thanh toán đầy đủ và đúng hạn theo phương thức đã chọn.</p>
            <p>3. Trách nhiệm của khách hàng: Cung cấp thông tin chính xác, hợp tác trong suốt quá trình sử dụng dịch vụ và tuân thủ quy định của pháp luật.</p>
            <p>4. Bảo mật: Thông tin cá nhân và dữ liệu giao dịch của khách hàng sẽ được bảo mật, không chia sẻ cho bên thứ ba nếu không có sự đồng ý.</p>
            <p>5. Hủy dịch vụ: Khách hàng có thể yêu cầu hủy dịch vụ theo chính sách, các khoản phí đã thanh toán có thể không được hoàn trả trừ khi có thỏa thuận khác.</p>
            <p>6. Chấm dứt hợp đồng: Nhà cung cấp có quyền chấm dứt hợp đồng nếu khách hàng vi phạm điều khoản, gian lận hoặc có hành vi gây hại đến hệ thống.</p>
            <p>7. Quyền sở hữu trí tuệ: Tất cả nội dung, tài liệu, hình ảnh và phần mềm liên quan đến dịch vụ thuộc quyền sở hữu của nhà cung cấp.</p>
            <p>8. Giới hạn trách nhiệm: Nhà cung cấp không chịu trách nhiệm đối với các thiệt hại gián tiếp, ngẫu nhiên hoặc ngoài tầm kiểm soát.</p>
            <p>9. Hỗ trợ kỹ thuật: Khách hàng được quyền nhận hỗ trợ trong phạm vi và thời gian quy định theo gói dịch vụ.</p>
            <p>10. Điều khoản chung: Các điều khoản này có thể được cập nhật theo thời gian, khách hàng có trách nhiệm theo dõi và tuân thủ.</p>
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
