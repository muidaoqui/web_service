import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";

function CheckDomain() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await axios.get(`http://localhost:5000/api/check-domain?domain=${query}`);
      setResults(res.data.results || []);
    } catch (err) {
      console.error("❌ Lỗi khi check domain:", err);
      setError("Không thể kiểm tra tên miền. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center bg-gray-50 min-h-screen">
      {/* Ô search */}
      <div className="w-full max-w-2xl flex items-center border-2 border-green-600 rounded-full overflow-hidden">
        <input
          type="text"
          placeholder="Nhập tên miền bạn muốn tìm kiếm..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow px-6 h-14 focus:outline-none text-gray-700"
        />
        <button
          onClick={handleSearch}
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
        {results.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center border rounded-md p-4 bg-white shadow"
          >
            <div>
              <p className="font-bold text-lg">{item.domain}</p>
              {item.available === false ? (
                <p className="text-red-600">❌ Rất tiếc, tên miền đã có người mua.</p>
              ) : item.available === true ? (
                <p className="text-green-600">✅ Tên miền còn trống, bạn có thể đăng ký.</p>
              ) : (
                <p className="text-gray-500">⚠️ Không xác định được trạng thái.</p>
              )}
            </div>
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Xem thông tin tên miền
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CheckDomain;
