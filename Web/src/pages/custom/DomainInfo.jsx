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
                // API trả về { success, message, data }
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

    if (loading) return <p className="p-6">⏳ Đang tải thông tin...</p>;
    if (error) return <p className="p-6 text-red-500">{error}</p>;
    if (!info) return <p className="p-6">⚠️ Không có dữ liệu tên miền</p>;

    const handleOrder = () => {
        navigate("/domain-order", { state: { domainInfo: info } });
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Thông tin chi tiết: {info.name}</h1>
            <ul className="space-y-2">
                <li>
                    <strong>Loại:</strong> {info.type === "vn" ? ".vn" : ".qt (quốc tế)"}
                </li>
                <li>
                    <strong>Giá đăng ký mới:</strong>{" "}
                    {info.newPrice
                        ? info.newPrice.toLocaleString("vi-VN") + " VNĐ"
                        : "Liên hệ"}
                </li>
                <li>
                    <strong>Gia hạn:</strong>{" "}
                    {info.renewPrice
                        ? info.renewPrice.toLocaleString("vi-VN") + " VNĐ / năm"
                        : "Liên hệ"}
                </li>
                <li>
                    <strong>Chuyển đổi:</strong> {info.transfer || "Không có dữ liệu"}
                </li>
            </ul>

            <button className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={handleOrder}
            >
                🛒 Đăng ký tên miền
            </button>
        </div>
    );
}

export default DomainInfo;
