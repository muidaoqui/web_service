import React, { useState, useEffect } from "react";
import axios from "axios";
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
} from "antd";

const { Option } = Select;
const { confirm } = Modal;

function AdminDomain() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [form] = Form.useForm();
  const { Search } = Input;

  // fetch API
  const fetchDomains = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/domains");
      const data = res.data.data || res.data || [];
      setDomains(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Lỗi khi fetch domains:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDomains();
  }, []);

  // mở form sửa
  const handleEdit = (domain) => {
    setSelectedDomain(domain);
    form.setFieldsValue(domain);
    setIsDrawerOpen(true);
  };

  // mở form thêm mới
  const handleCreateNew = () => {
    setSelectedDomain(null);
    form.resetFields();
    setIsDrawerOpen(true);
  };

  // đóng drawer
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedDomain(null);
  };

  // submit form
  const handleSubmit = async (values) => {
    try {
      if (selectedDomain) {
        await axios.put(`/api/domains/${selectedDomain._id}`, values);
      } else {
        await axios.post("/api/domains", values);
      }
      fetchDomains();
      setIsDrawerOpen(false);
    } catch (err) {
      console.error("Lỗi khi lưu domain:", err);
    }
  };

  // xóa
  const handleDelete = (domain) => {
    confirm({
      title: "Bạn có chắc muốn xóa domain này?",
      content: domain.name,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await axios.delete(`/api/domains/${domain._id}`);
          fetchDomains();
        } catch (err) {
          console.error("Lỗi khi xóa domain:", err);
        }
      },
    });
  };

  // lọc dữ liệu theo type
  const filteredDomains =
    filterType === "all"
      ? domains
      : domains.filter((d) => d.type === filterType);

  // cấu hình cột Table
  const columns = [
    {
      title: "Tên miền",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Đơn giá",
      dataIndex: "newPrice",
      key: "newPrice",
    },
    {
      title: "Gia hạn",
      dataIndex: "renewPrice",
      key: "renewPrice",
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (t) => <Tag color="blue">{t}</Tag>,
    },
    {
      title: "Trạng thái",
      dataIndex: "isDeleted",
      key: "isDeleted",
      render: (isDeleted) =>
        isDeleted ? (
          <Tag color="red">Đã xóa</Tag>
        ) : (
          <Tag color="green">Hoạt động</Tag>
        ),
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
    <div className="min-h-screen text-white p-4 bg-black shadow rounded-2xl mt-4">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Domain</h1>

      {/* Thanh action */}
      <div className="flex justify-between mb-4">
        <Space>
          <Select
            value={filterType}
            onChange={setFilterType}
            style={{ width: 160 }}
          >
            <Option value="all">-- Tất cả loại --</Option>
            <Option value="qt">Quốc tế</Option>
            <Option value="vn">.VN</Option>
            <Option value="khac">Khác</Option>
          </Select>
          <Search
            placeholder="Tìm theo tên gói..."
            allowClear
            onSearch={(value) => setSearch(value)}
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

      {/* Bảng dữ liệu */}
      <Table
        columns={columns}
        dataSource={filteredDomains}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      {/* Drawer Form */}
      <Drawer
        title={selectedDomain ? "Chỉnh sửa Domain" : "Tạo mới Domain"}
        width={480}
        onClose={handleCloseDrawer}
        open={isDrawerOpen}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ isDeleted: false }}
        >
          <Form.Item
            name="name"
            label="Tên miền"
            rules={[{ required: true, message: "Nhập tên miền" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="newPrice"
            label="Đơn giá"
            rules={[{ required: true, message: "Nhập đơn giá" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="renewPrice"
            label="Gia hạn"
            rules={[{ required: true, message: "Nhập giá gia hạn" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="type" label="Loại">
            <Select placeholder="Chọn loại domain">
              <Option value="qt">Quốc tế</Option>
              <Option value="vn">.VN</Option>
              <Option value="khac">Khác</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="isDeleted"
            label="Trạng thái"
            valuePropName="checked"
          >
            <Switch
              checkedChildren="Hoạt động"
              unCheckedChildren="Đã xóa"
            />
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

export default AdminDomain;
