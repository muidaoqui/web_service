import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { Card, Button, Input, Select, Spin, message } from "antd";
import { useNavigate } from "react-router-dom";

const { Search } = Input;
const { Option } = Select;

const categories = ["Công Ty", "Tour Du Lịch", "Giới Thiệu - Tin Tức", "Y Tế", "Bán Hàng"];

function Theme() {
    const [themes, setThemes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [activeCategory, setActiveCategory] = useState("Bán Hàng");
    const [search, setSearch] = useState("");
    const [sortType, setSortType] = useState("default");

    const navigate = useNavigate();

    // Fetch themes
    const fetchThemes = async () => {
        setLoading(true);
        try {
            const res = await api.get("/themes");
            const data = res.data.data || res.data || [];
            setThemes(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Lỗi khi fetch themes:", err);
            message.error("Không thể tải danh sách theme");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchThemes();
    }, []);

    // Filter + search + sort
    const filteredThemes = themes
        .filter((t) => activeCategory === "Tất cả" || t.category === activeCategory)
        .filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortType === "asc") return a.price - b.price;
            if (sortType === "desc") return b.price - a.price;
            return 0;
        });

    return (
        <div className="mt-30 min-h-screen p-6 bg-white">
            {/* Category Tabs */}
            <div className="flex justify-center gap-3 mb-6 flex-wrap">
                {categories.map((c) => (
                    <Button
                        key={c}
                        type={activeCategory === c ? "primary" : "default"}
                        shape="round"
                        onClick={() => setActiveCategory(c)}
                    >
                        {c}
                    </Button>
                ))}
            </div>

            {/* Search + Sort */}
            <div className="flex justify-between items-center mb-6">
                <Search
                    placeholder="Tìm kiếm theme..."
                    allowClear
                    onSearch={setSearch}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: 250 }}
                />
                <Select value={sortType} onChange={setSortType} style={{ width: 160 }}>
                    <Option value="default">Sắp xếp mặc định</Option>
                    <Option value="asc">Giá tăng dần</Option>
                    <Option value="desc">Giá giảm dần</Option>
                </Select>
            </div>

            {/* Themes Grid */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <Spin size="large" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredThemes.map((theme) => (
                        <Card
                            key={theme._id}
                            hoverable
                            cover={
                                theme.thumbnail ? (
                                    <img
                                        alt={theme.name}
                                        src={theme.thumbnail}
                                        className="h-auto w-full object-cover rounded-t-xl"
                                    />
                                ) : null
                            }
                            className="border rounded-xl flex flex-col"
                        >
                            <div className="p-4 flex-1 mb-4">
                                <h2 className="text-lg font-semibold mb-1">{theme.name}</h2>
                                <p className="text-green-600 font-bold mb-3">
                                    {theme.price.toLocaleString("vi-VN")}đ
                                </p>
                                <p className="text-gray-600 text-sm line-clamp-3">
                                    {theme.description}
                                </p>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 flex justify-between p-4 pt-0 mt-auto">
                                <Button onClick={() => navigate(`/templates/${theme._id}`)}>
                                    Chi tiết
                                </Button>
                                {theme.demoUrl && (
                                    <Button type="primary">
                                        <a href={theme.demoUrl} target="_blank" rel="noreferrer">
                                            Xem Demo
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Theme;
