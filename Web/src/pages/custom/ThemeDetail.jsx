import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Tabs, Card, Spin } from "antd";

const { TabPane } = Tabs;

function ThemeDetail() {
  const { id } = useParams();
  const [theme, setTheme] = useState(null);
  const [similarThemes, setSimilarThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("desc");

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        setLoading(true);
        // Lấy chi tiết theme
        const res = await fetch(`/api/themes/${id}`);
        const data = await res.json();
        setTheme(data);

        // Lấy theme tương tự theo category
        if (data.category) {
          const resSimilar = await fetch(
            `/api/themes?category=${encodeURIComponent(data.category)}`
          );
          let list = await resSimilar.json();
          // bỏ theme hiện tại ra khỏi danh sách
          list = list.filter((t) => t._id !== id);
          setSimilarThemes(list);
        }
      } catch (err) {
        console.error("Lỗi tải dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTheme();
  }, [id]);

  if (loading) return <div className="flex justify-center p-10"><Spin size="large" /></div>;
  if (!theme) return <p className="p-10">Không tìm thấy theme</p>;

  return (
    <div className="mt-30 w-full bg-gray-100">
      {/* Header */}
      <div className=" max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Ảnh */}
        <div>
          <img
            src={theme.thumbnail}
            alt={theme.name}
            className="h-full rounded-lg border shadow-md"
          />
        </div>

        {/* Thông tin */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-2">{theme.name}</h1>
          <p className="text-green-600 text-xl font-semibold mb-4">
            {theme.price.toLocaleString("vi-VN")}đ
          </p>

          <p className="mb-2">
            <strong>Cập nhật lần cuối:</strong>{" "}
            {theme.updatedAt ? new Date(theme.updatedAt).toLocaleDateString() : "N/A"}
          </p>
          <p className="mb-2">
            <strong>Trình duyệt hỗ trợ:</strong>{" "}
            {theme.compatibility?.browsers?.join(", ") || "-"}
          </p>
          <p className="mb-2">
            <strong>Tương thích:</strong>{" "}
            {theme.compatibility?.wordpress?.join(", ") || "-"}
          </p>
          <p className="mb-4">
            <strong>Plugin đi kèm:</strong>{" "}
            {theme.compatibility?.plugins?.join(", ") || "-"}
          </p>

          <div className="flex gap-4 mt-4">
            <Button type="primary">Tư vấn</Button>
            {theme.demoUrl && (
              <Button>
                <a href={theme.demoUrl} target="_blank" rel="noreferrer">
                  Xem Demo
                </a>
              </Button>
            )}
          </div>

          <p className="mt-4 text-gray-600">
            Danh mục: <span className="font-semibold">{theme.category}</span>
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Tabs activeKey={activeTab} onChange={setActiveTab} className="flex items-center text-2xl">
            <TabPane tab="Mô tả" key="desc" className="text-lg">
              <div className="prose max-w-none">
                <h3 className="font-semibold mb-2">Tính năng nổi bật:</h3>
                <ul className="list-disc pl-6">
                  {theme.features?.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
                <p className="mt-4">{theme.description || "Không có mô tả"}</p>
              </div>
            </TabPane>
            <TabPane tab="Thông tin khác" key="extra" className="text-lg">
              <div>
                {theme.reasons?.length > 0 ? (
                  <ul className="list-disc pl-6">
                    {theme.reasons.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Không có thêm thông tin</p>
                )}
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>

      {/* Similar themes */}
      <div className="w-full bg-gray-100 border-t">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h2 className="text-xl font-bold mb-6">Giao diện tương tự</h2>
          {similarThemes.length === 0 ? (
            <p>Không có giao diện tương tự</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 h-full">
              {similarThemes.map((t) => (
                <Card
                  key={t._id}
                  hoverable
                  cover={
                    <img
                      src={t.thumbnail}
                      alt={t.name}
                      className="h-40 object-cover"
                    />
                  }
                >
                  <h3 className="font-semibold mb-1">{t.name}</h3>
                  <p className="text-green-600 font-bold mb-2">
                    {t.price.toLocaleString("vi-VN")}đ
                  </p>
                  <div className="flex justify-between">
                    <Button size="small" href={`/themes/${t._id}`}>
                      Chi tiết
                    </Button>
                    {t.demoUrl && (
                      <Button size="small" type="primary">
                        <a href={t.demoUrl} target="_blank" rel="noreferrer">
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ThemeDetail;
