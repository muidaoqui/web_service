import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button, Select, Space, Divider, message, notification } from "antd";
import { DollarOutlined, CalendarOutlined, ShoppingCartOutlined, ReloadOutlined } from "@ant-design/icons";

const { Option } = Select;

function DomainOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  // Nhận dữ liệu tên miền từ state của router, được truyền từ trang trước
  const domainInfo = location.state?.domainInfo;

  // Kiểm tra xem dữ liệu có hợp lệ không
  if (!domainInfo || !domainInfo.name || !domainInfo.newPrice) {
    notification.error({
      message: 'Lỗi',
      description: 'Không có thông tin tên miền hợp lệ để đặt hàng.',
    });
    return <div className="p-6 text-center text-red-500">Không có thông tin tên miền hợp lệ!</div>;
  }

  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(1);
  const [renewalYear, setRenewalYear] = useState(1);

  // Tính toán tổng giá
  const calculateTotalPrice = (years) => {
    return domainInfo.newPrice * years;
  };

  const handleOrder = async () => {
    setLoading(true);
    try {
      await axios.post("/api/orders", {
        items: [
          {
            productType: "domain",
            productId: domainInfo._id, // Hoặc ID nếu bạn có
            domainName: domainInfo.name,
            newPrice: domainInfo.newPrice,
            duration: selectedYear,
            renewal: renewalYear
          },
        ],
        paymentMethod: "bank",
        contact: "user_contact_info_here", // Thay thế bằng thông tin người dùng
      });
      message.success("Đặt hàng tên miền thành công!");
      navigate("/profile");
    } catch (err) {
      console.error("Lỗi đặt hàng tên miền:", err);
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Cột chính: Tùy chọn đăng ký */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4 text-green-700">
          Xác nhận Đăng ký Tên miền
        </h2>
        <Card className="rounded-xl shadow-lg p-6 bg-white">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            <DollarOutlined style={{ color: '#16a34a' }} /> Tên miền: <span className="text-green-600">{domainInfo.name}</span>
          </h3>
          <Divider />
          <Space direction="vertical" size="large" className="w-full">
            <div className="flex items-center">
              <CalendarOutlined style={{ fontSize: '20px', color: '#16a34a', marginRight: '8px' }} />
              <span className="font-semibold text-gray-700">Thời hạn đăng ký:</span>
              <Select
                defaultValue={1}
                style={{ width: 120, marginLeft: 'auto' }}
                onChange={setSelectedYear}
                value={selectedYear}
              >
                {yearsOptions.map(opt => (
                  <Option key={opt.years} value={opt.years}>{opt.label}</Option>
                ))}
              </Select>
            </div>
            
            <div className="flex items-center">
              <ReloadOutlined style={{ fontSize: '20px', color: '#16a34a', marginRight: '8px' }} />
              <span className="font-semibold text-gray-700">Giá gia hạn hàng năm:</span>
              <span className="ml-auto text-gray-900 font-bold">
                {getRenewalPrice() === "Liên hệ" ? "Liên hệ" : `${getRenewalPrice().toLocaleString("vi-VN")} VNĐ/năm`}
              </span>
            </div>
            
          </Space>
        </Card>
      </div>

      {/* Cột phụ: Tóm tắt đơn hàng */}
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
        <Button
          type="primary"
          onClick={handleOrder}
          disabled={loading}
          className="w-full mt-4 py-3 font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-all shadow-lg"
          icon={<ShoppingCartOutlined />}
        >
          {loading ? "Đang xử lý..." : "Hoàn tất đăng ký"}
        </Button>
      </div>
    </div>
  );
}

export default DomainOrder;
