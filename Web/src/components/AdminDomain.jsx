import React, {useState, useEffect} from "react";
import axios from "axios";

function AdminDomain() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/domains")
      .then((res) => {
        console.log("API domains:", res.data);
        setDomains(res.data.data || res.data || []);
      })
      .catch((err) => console.error("Lỗi khi fetch domains:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-10">Đang tải...</p>;

  return (
    <div className="min-h-screen text-white p-4 bg-black shadow rounded-2xl mt-4">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Domain</h1>
      <div>
        <table className="min-w-full divide-y divide-gray-700 text-center">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3  text-xs font-medium text-gray-400 uppercase tracking-wider">Tên miền</th>
              <th className="px-6 py-3  text-xs font-medium text-gray-400 uppercase tracking-wider">Đơn giá</th>
              <th className="px-6 py-3  text-xs font-medium text-gray-400 uppercase tracking-wider">Gia hạn</th>
              <th className="px-6 py-3  text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3  text-xs font-medium text-gray-400 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-3  text-xs font-medium text-gray-400 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {domains.map((domain) => (
              <tr key={domain.id} className="">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{domain.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{domain.newPrice}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{domain.renewPrice}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{domain.type}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${domain.isDeleted ? "text-red-500" : "text-green-500"}`}>
                  {domain.isDeleted ? "Đã xóa" : "Hoạt động"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button className="text-red-500 hover:text-red-700">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDomain;
