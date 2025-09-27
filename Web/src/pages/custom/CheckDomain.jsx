import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function CheckDomain() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const domain = queryParams.get("domain");

  const [query, setQuery] = useState(domain || "");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (domain) handleSearch(domain);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain]);

  const handleSearch = async (d) => {
    const searchDomain = d || query;
    if (!searchDomain.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await axios.get(`/api/check-domain?domain=${searchDomain}`);
      setResults(res.data.results || []);
    } catch (err) {
      console.error("❌ Lỗi khi check domain:", err);
      setError("Không thể kiểm tra tên miền. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!query.trim()) return;
    navigate(`/check-domain?domain=${query.trim()}`);
  };

  const handleViewDetail = (id) => {
    if (!id) {
      alert("⚠️ Tên miền này chưa có trong cơ sở dữ liệu, vui lòng liên hệ hỗ trợ.");
      return;
    }
    navigate(`/domain-info/${id}`, { state: { domainId: id } });
  };

  return (
    <div className="p-6 flex flex-col items-center bg-gray-50 min-h-screen mt-30">
      {/* Ô search */}
      <div className="w-full max-w-2xl flex items-center border-2 border-green-600 rounded-full overflow-hidden">
        <input
          type="text"
          placeholder="Nhập tên miền bạn muốn tìm kiếm..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="flex-grow px-6 h-14 focus:outline-none text-gray-700"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 h-14 flex items-center justify-center"
        >
          {loading ? "Đang tìm..." : <SearchOutlined style={{ fontSize: "20px" }} />}
        </button>
      </div>

      {/* Thông báo lỗi */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Kết quả */}
      <div className="w-full max-w-3xl mt-8 space-y-4">
        {loading ? (
          <p className="text-gray-500">⏳ Đang kiểm tra...</p>
        ) : results.length > 0 ? (
          results.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center border rounded-md p-4 bg-white shadow"
            >
              <div>
                <p className="font-bold text-lg">{item.domain}</p>
                {item.available === false ? (
                  <p className="text-red-600"> Đã có người đăng ký.</p>
                ) : item.available === true ? (
                  <p className="text-green-600"> Còn trống, chưa có người đăng ký.</p>
                ) : (
                  <p className="text-gray-500"> Còn trống, chưa có người đăng ký.</p>
                )}
                <p className="text-gray-700 mt-1">
                  💲 Giá:{" "}
                  {item.price
                    ? item.price.toLocaleString("vi-VN") + " VNĐ"
                    : "Liên hệ"}
                </p>
              </div>
              <button
                onClick={() => handleViewDetail(item.dbId)}
                disabled={!item.dbId}
                className={`px-4 py-2 rounded ${
                  item.available
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-200 hover:bg-gray-300"
                } ${!item.dbId ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {item.available ? "Mua ngay" : "Xem chi tiết"}
              </button>
            </div>
          ))
        ) : domain ? (
          <p className="text-gray-500">
            🔍 Không tìm thấy kết quả nào cho "{domain}".
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default CheckDomain;
