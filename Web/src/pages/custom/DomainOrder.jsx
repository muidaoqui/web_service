import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Select, Space, Divider, notification } from "antd";
import { DollarOutlined, CalendarOutlined, ReloadOutlined } from "@ant-design/icons";

const { Option } = Select;

function DomainOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const domainInfo = location.state?.domainInfo;

  if (!domainInfo || !domainInfo.name || !domainInfo.newPrice) {
    notification.error({
      message: "Lỗi",
      description: "Không có thông tin tên miền hợp lệ để đặt hàng.",
    });
    return <div className="p-6 text-center text-red-500">Không có thông tin tên miền hợp lệ!</div>;
  }

  const [selectedYear, setSelectedYear] = useState(1);

  const calculateTotalPrice = (years) => {
    return domainInfo.newPrice * years;
  };

  const getRenewalPrice = () => {
    return domainInfo.renewPrice || "Liên hệ";
  };

  const yearsOptions = [
    { years: 1, label: "1 năm" },
    { years: 2, label: "2 năm" },
    { years: 3, label: "3 năm" },
    { years: 4, label: "4 năm" },
    { years: 5, label: "5 năm" },
  ];

  const handleGoToPay = () => {
    const cart = [
      {
        productType: "domain",
        productId: domainInfo._id,
        name: domainInfo.name,
        price: calculateTotalPrice(selectedYear),
        duration: selectedYear,
      },
    ];
    navigate("/pay", { state: { cart } });
  };

  return (
    <div className="mt-30 flex flex-col md:flex-row gap-8 max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8 ">
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Xác nhận Đăng ký Tên miền</h2>
        <Card className="rounded-xl shadow-lg p-6 bg-white">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            <DollarOutlined style={{ color: "#16a34a" }} /> Tên miền:{" "}
            <span className="text-green-600">{domainInfo.name}</span>
          </h3>
          <Divider />
          <Space direction="vertical" size="large" className="w-full">
            <div className="flex items-center">
              <CalendarOutlined style={{ fontSize: "20px", color: "#16a34a", marginRight: "8px" }} />
              <span className="font-semibold text-gray-700">Thời hạn đăng ký:</span>
              <Select
                defaultValue={1}
                style={{ width: 120, marginLeft: "auto" }}
                onChange={setSelectedYear}
                value={selectedYear}
              >
                {yearsOptions.map((opt) => (
                  <Option key={opt.years} value={opt.years}>
                    {opt.label}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="flex items-center">
              <ReloadOutlined style={{ fontSize: "20px", color: "#16a34a", marginRight: "8px" }} />
              <span className="font-semibold text-gray-700">Giá gia hạn hàng năm:</span>
              <span className="ml-auto text-gray-900 font-bold">
                {getRenewalPrice() === "Liên hệ"
                  ? "Liên hệ"
                  : `${getRenewalPrice().toLocaleString("vi-VN")} VNĐ/năm`}
              </span>
            </div>
          </Space>
        </Card>
      </div>

      <div className="w-full md:w-80">
        <Card className="rounded-xl shadow-lg p-6 bg-white">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Tóm tắt đơn hàng</h3>
          <Divider />
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Dịch vụ:</span>
              <span className="text-green-700 font-bold">Đăng ký tên miền</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tên miền:</span>
              <span className="font-semibold">{domainInfo.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Thời gian:</span>
              <span>{selectedYear} năm</span>
            </div>
            <Divider />
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Tổng cộng:</span>
              <span className="text-red-600">
                {calculateTotalPrice(selectedYear).toLocaleString("vi-VN")} VNĐ
              </span>
            </div>
          </div>
        </Card>
        <button
          className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-all mt-4"
          onClick={handleGoToPay}
        >
          Vào giỏ hàng
        </button>
      </div>
    </div>
  );
}

export default DomainOrder;
