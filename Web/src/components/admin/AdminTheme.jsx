import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import {
  Table,
  Tag,
  Button,
  Space,
  Modal,
  Drawer,
  Form,
  Input,
  Select,
  Switch,
  message,
} from "antd";

const { Option } = Select;
const { confirm } = Modal;
const { Search } = Input;

function AdminTheme() {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const [form] = Form.useForm();

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

  // Edit
  const handleEdit = (theme) => {
    setSelectedTheme(theme);
    form.setFieldsValue(theme);
    setIsDrawerOpen(true);
  };

  // Create new
  const handleCreateNew = () => {
    setSelectedTheme(null);
    form.resetFields();
    setIsDrawerOpen(true);
  };

  // Close drawer
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTheme(null);
  };

  // Submit form
  const handleSubmit = async (values) => {
    try {
      if (selectedTheme) {
        await api.put(`/themes/${selectedTheme._id}`, values);
        message.success("Cập nhật theme thành công");
      } else {
        await api.post("/themes", values);
        message.success("Tạo mới theme thành công");
      }
      fetchThemes();
      setIsDrawerOpen(false);
    } catch (err) {
      console.error("Lỗi khi lưu theme:", err);
      message.error("Lưu theme thất bại");
    }
  };

  // Delete
  const handleDelete = (theme) => {
    confirm({
      title: "Bạn có chắc muốn xóa theme này?",
      content: theme.name,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          if (!theme._id) {
            message.error("Theme không có _id");
            return;
          }
          const res = await api.delete(`/themes/${theme._id}`);
          message.success(res.data.message || "Xóa thành công");
          fetchThemes();
        } catch (err) {
          message.error("Xóa theme thất bại");
          console.error("Lỗi khi xóa theme:", err);
        }
      },
    });
  };

  // Filter + search
  const filteredThemes = themes
    .filter((t) => filterCategory === "all" || t.category === filterCategory)
    .filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));

  // Table columns
  const columns = [
    { title: "Tên theme", dataIndex: "name", key: "name" },
    { title: "Danh mục", dataIndex: "category", key: "category" },
    { title: "Giá", dataIndex: "price", key: "price" },
    {
      title: "Demo",
      dataIndex: "demoUrl",
      key: "demoUrl",
      render: (url) =>
        url ? (
          <a href={url} target="_blank" rel="noreferrer">
            Xem demo
          </a>
        ) : (
          "-"
        ),
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (url) =>
        url ? <img src={url} alt="thumb" style={{ width: 60 }} /> : "-",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            ✏️ Sửa
          </Button>
          <Button danger type="link" onClick={() => handleDelete(record)}>
            🗑️ Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen text-white p-4 bg-black shadow rounded-2xl mt-30">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Theme</h1>

      {/* Action bar */}
      <div className="flex justify-between mb-4">
        <Space>
          <Select
            value={filterCategory}
            onChange={setFilterCategory}
            style={{ width: 160 }}
          >
            <Option value="all">-- Tất cả danh mục --</Option>
            <Option value="business">Business</Option>
            <Option value="portfolio">Portfolio</Option>
            <Option value="blog">Blog</Option>
            <Option value="ecommerce">E-commerce</Option>
          </Select>
          <Search
            placeholder="Tìm theo tên theme..."
            allowClear
            onSearch={setSearch}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 250 }}
          />
        </Space>
        <Space>
          <Button type="primary" onClick={handleCreateNew}>
            ➕ Tạo mới
          </Button>
          <Button>📥 Import</Button>
          <Button>📤 Export</Button>
        </Space>
      </div>

      {/* Data table */}
      <Table
        columns={columns}
        dataSource={filteredThemes}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      {/* Drawer Form */}
      <Drawer
        title={selectedTheme ? "Chỉnh sửa Theme" : "Tạo mới Theme"}
        width={480}
        onClose={handleCloseDrawer}
        open={isDrawerOpen}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Tên Theme"
            rules={[{ required: true, message: "Nhập tên theme" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Danh mục"
            rules={[{ required: true, message: "Chọn danh mục" }]}
          >
            <Select placeholder="Chọn danh mục">
              <Option value="business">Business</Option>
              <Option value="portfolio">Portfolio</Option>
              <Option value="blog">Blog</Option>
              <Option value="ecommerce">E-commerce</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: "Nhập giá" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="thumbnail" label="Thumbnail URL">
            <Input />
          </Form.Item>
          <Form.Item name="demoUrl" label="Demo URL">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="features" label="Tính năng (cách nhau dấu ,)">
            <Input placeholder="Ex: Responsive,SEO,Dark Mode" />
          </Form.Item>
          <Form.Item name="reasons" label="Lý do chọn (cách nhau dấu ,)">
            <Input placeholder="Ex: Dễ dùng,Nhanh,Đẹp" />
          </Form.Item>
          <Form.Item name="compatibility" label="Tương thích (JSON)">
            <Input.TextArea placeholder='{"browsers":["Chrome"],"wordpress":["5.0+"],"plugins":["Elementor"]}' />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={handleCloseDrawer}>Hủy</Button>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </div>
        </Form>
      </Drawer>
    </div>
  );
}

export default AdminTheme;
