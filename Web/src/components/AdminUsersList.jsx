import React, {useState, useEffect} from "react";
import axios from "axios";


function AdminUsersList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch API
    useEffect(() => {
        axios.get("/api/users")
            .then((res) => {
                console.log("API users:", res.data);
                setUsers(res.data.data || res.data || []);
            })

            .catch((err) => console.error("Lỗi khi fetch users:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="text-center py-10">Đang tải...</p>;

    return (
        <div className="min-h-screen text-white p-4 bg-black shadow rounded-2xl mt-4">
            <h2 className="text-3xl font-bold text-center mb-8">DANH SÁCH NGƯỜI DÙNG</h2>
            <div>
                <table className="min-w-full divide-y divide-gray-700 text-center">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="px-6 py-3  text-xs font-medium text-gray-400 uppercase tracking-wider">Tên người dùng</th>
                            <th className="px-6 py-3  text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3  text-xs font-medium text-gray-400 uppercase tracking-wider">Trạng thái</th>
                            <th className="px-6 py-3  text-xs font-medium text-gray-400 uppercase tracking-wider">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-900 divide-y divide-gray-700">
                        {users.map((user) => (
                            <tr key={user.id} className="">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                                {/* nếu đã xóa thì màu đỏ không thì màu xanh lá */}
                                <td className={`px-6 py-4 whitespace-nowrap text-sm ${user.isDeleted ? "text-red-500" : "text-green-500"}`}>
                                    {user.isDeleted ? "Đã xóa" : "Hoạt động"}
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

export default AdminUsersList;
