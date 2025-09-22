import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function DomainInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state?.domainId;

  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      setError("");

      try {
        console.log("Fetching domain info for ID:", id);
        const res = await axios.get(`/api/domains/${id}`);
        setInfo(res.data.data);
      } catch (err) {
        console.error("❌ Lỗi DomainInfo:", err);
        setError("Không thể tải thông tin tên miền");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchInfo();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
        <ul className="space-y-3">
          <li className="h-4 bg-gray-300 rounded w-2/3"></li>
          <li className="h-4 bg-gray-300 rounded w-1/2"></li>
          <li className="h-4 bg-gray-300 rounded w-1/4"></li>
          <li className="h-4 bg-gray-300 rounded w-1/3"></li>
        </ul>
        <div className="mt-6 h-10 bg-gray-300 rounded w-1/4"></div>
      </div>
    );
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  if (!info) {
    return <p className="p-6">⚠️ Không có dữ liệu tên miền</p>;
  }

  const handleOrder = () => {
    navigate("/domain-order", { state: { domainInfo: info } });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow my-10">
      <h1 className="text-2xl font-bold mb-4">
        Thông tin chi tiết: {info.name}
      </h1>

      <ul className="space-y-2">
        <li>
          <strong>Loại:</strong>{" "}
          {info.type === "vn" ? ".vn" : ".qt (quốc tế)"}
        </li>
        <li>
          <strong>Giá đăng ký mới:</strong>{" "}
          {info.newPrice
            ? `${info.newPrice.toLocaleString("vi-VN")} VNĐ`
            : "Liên hệ"}
        </li>
        <li>
          <strong>Gia hạn:</strong>{" "}
          {info.renewPrice
            ? `${info.renewPrice.toLocaleString("vi-VN")} VNĐ / năm`
            : "Liên hệ"}
        </li>
        <li>
          <strong>Chuyển đổi:</strong>{" "}
          {info.transfer || "Không có dữ liệu"}
        </li>
      </ul>

      <button
        onClick={handleOrder}
        className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        🛒 Đăng ký tên miền
      </button>
    </div>
  );
}

export default DomainInfo;
