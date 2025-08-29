import React, {useState, useEffect} from "react";
import axios from "axios";


function AdminHosting() {
  const [hostings, setHostings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/hostings")
      .then((res) => {
        console.log("API hostings:", res.data);
        setHostings(res.data.data || res.data || []);
      })
      .catch((err) => console.error("Lỗi khi fetch hostings:", err))
      .finally(() => setLoading(false));
  }, []);


  if (loading) return <p className="text-center py-10">Đang tải...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-orange-200 to-yellow-100 ">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Hosting</h1>
      <div>
        <table className="min-w-full divide-y divide-gray-700 text-center">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3  text-xs font-medium text-gray-400 uppercase tracking-wider">Gói Hosting</th>
              <th className="px-6 py-3  text-xs font-medium text-gray-400 uppercase tracking-wider">Dung lượng</th>
              <th className="px-6 py-3  text-xs font-medium text-gray-400 uppercase tracking-wider">Băng thông</th>
              <th className="px-6 py-3  text-xs font-medium text-gray-400 uppercase tracking-wider">MySQL</th>
              <th className="px-6 py-3  text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3  text-xs font-medium text-gray-400 uppercase tracking-wider">Đơn giá</th>
              <th className="px-6 py-3  text-xs font-medium text-gray-400 uppercase tracking-wider">Backup</th>
              <th className="px-6 py-3  text-xs font-medium text-gray-400 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-3  text-xs font-medium text-gray-400 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {hostings.map((hosting) => (
              <tr key={hosting.id} className="">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{hosting.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{hosting.dungluong}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{hosting.subdomain}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{hosting.mysql}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{hosting.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{hosting.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{hosting.backup}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${hosting.isDeleted ? "text-red-500" : "text-green-500"}`}>
                  {hosting.isDeleted ? "Đã xóa" : "Hoạt động"}
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

export default AdminHosting;
