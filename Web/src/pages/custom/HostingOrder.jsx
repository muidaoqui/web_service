import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function HostingOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plan;

  if (!plan || !plan.price || !plan.yearly || !plan.name) {
    return <p>Không có thông tin gói hosting hợp lệ!</p>;
  }

  const [selectedYear, setSelectedYear] = useState(1);
  const cleanedString = plan.yearly.replace(/[^0-9]/g, "");
  const yearlyPrice = Number(cleanedString);

  const getOriginPrice = (years) => yearlyPrice * years;
  const getDiscountPrice = (years) => {
    if (years === 1) return yearlyPrice;
    if (years === 2) return Math.round(yearlyPrice * 1.8);
    if (years === 3) return Math.round(yearlyPrice * 2.5);
    return yearlyPrice * years;
  };
  const getSave = (years) => getOriginPrice(years) - getDiscountPrice(years);

  const options = [
    { years: 1, label: "Đăng ký 1 năm", discount: 0 },
    { years: 2, label: "Đăng ký 2 năm", discount: getSave(2) },
    { years: 3, label: "Đăng ký 3 năm", discount: getSave(3) },
  ];

  const handleGoToPay = () => {
    const cart = [
      {
        productType: "hosting",
        productId: plan._id,
        name: plan.name,
        price: getDiscountPrice(selectedYear),
        duration: selectedYear,
      },
    ];
    navigate("/pay", { state: { cart } });
  };

  return (
    <div className="mt-30 flex flex-col md:flex-row gap-8 max-w-5xl mx-auto py-10">
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-4 text-green-700">
          Gần xong rồi! Đây là những tuỳ chọn hỗ trợ thêm cho bạn.
        </h2>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-2">Chọn thời hạn đăng ký để tiết kiệm hơn:</h3>
          <p className="mb-4 text-gray-600">
            Chọn thời hạn đăng ký càng lâu, tiết kiệm càng nhiều<br />
            <span className="text-green-700 font-bold">Hosting - {plan.name}</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {options.map((opt) => (
              <div
                key={opt.years}
                className={`rounded-xl p-6 text-center border-2 cursor-pointer transition-all duration-200
                  ${selectedYear === opt.years ? "border-green-700 bg-green-100" : "border-gray-200 bg-gray-50"}`}
                onClick={() => setSelectedYear(opt.years)}
              >
                <div className={`font-bold text-lg mb-2 ${selectedYear === opt.years ? "text-green-700" : "text-gray-700"}`}>
                  {opt.label}
                </div>
                <div className="mb-2">
                  <span className="text-gray-500">TIẾT KIỆM</span>
                  <div className="text-2xl font-bold text-red-600">
                    {opt.discount.toLocaleString()}đ
                  </div>
                  {opt.years > 1 && (
                    <div className="line-through text-gray-400 text-sm">
                      {getOriginPrice(opt.years).toLocaleString()}đ
                    </div>
                  )}
                </div>
                <div className="text-2xl font-bold text-gray-900 mt-2">
                  {getDiscountPrice(opt.years).toLocaleString()}đ
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full md:w-80">
        <div className="bg-white rounded-xl shadow p-6 mb-4">
          <h3 className="font-bold mb-2">Tóm tắt đơn hàng</h3>
          <div className="mb-2">
            Dịch vụ hosting:<br />
            <span className="text-green-700 font-bold">Hosting - {plan.name}</span>
            <br />
            <span className="text-gray-600">(Đăng ký {selectedYear} năm)</span>
          </div>
          <div className="text-lg font-bold text-red-600">
            Giá tạm tính: {getDiscountPrice(selectedYear).toLocaleString()}đ
          </div>
        </div>
        <button
          className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-all"
          onClick={handleGoToPay}
        >
          Vào giỏ hàng
        </button>
      </div>
    </div>
  );
}

export default HostingOrder;
