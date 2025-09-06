import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Drawer,
  Form,
  Input,
  Button,
  Select,
  Switch,
  Space,
  Tag,
  Modal,
} from "antd";

const { Option } = Select;
const { confirm } = Modal;
const { Search } = Input;

function AdminHosting() {
  const [hostings, setHostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("");
  const [search, setSearch] = useState(""); // ô search theo tên
  const [selectedHosting, setSelectedHosting] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchHostings = async (selectedType = "", keyword = "") => {
    setLoading(true);
    try {
      const res = await axios.get("/api/hostings", {
        params: { type: selectedType, name: keyword }, // truyền query type + name
      });
      if (Array.isArray(res.data.data?.hostings)) {
        setHostings(res.data.data.hostings);
      } else {
        setHostings([]);
      }
    } catch (err) {
      console.error("Lỗi khi fetch hostings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (hosting) => {
    setSelectedHosting(hosting);
    form.setFieldsValue(hosting);
    setIsDrawerOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedHosting(null);
    form.resetFields();
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedHosting(null);
  };

  const handleSubmit = async (values) => {
    try {
      if (selectedHosting) {
        await axios.put(`/api/hostings/${selectedHosting._id}`, values);
      } else {
        await axios.post("/api/hostings", values);
      }
      fetchHostings();
      setIsDrawerOpen(false);
    } catch (err) {
      console.error("Lỗi khi lưu hosting:", err);
    }
  };

  const handleDelete = (hosting) => {
    confirm({
      title: "Bạn có chắc muốn xóa gói hosting này?",
      content: hosting.name,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await axios.delete(`/api/hostings/${hosting._id}`);
          fetchHostings(type, search);
        } catch (err) {
          console.error("Lỗi khi xóa hosting:", err);
        }
      },
    });
  };

  useEffect(() => {
    fetchHostings(type, search);
  }, [type, search]);

  // Cột Table
  const columns = [
    {
      title: "Gói Hosting",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Dung lượng",
      dataIndex: "dungluong",
      key: "dungluong",
    },
    {
      title: "Băng thông",
      dataIndex: "subdomain",
      key: "subdomain",
    },
    {
      title: "MySQL",
      dataIndex: "mysql",
      key: "mysql",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Backup",
      dataIndex: "backup",
      key: "backup",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (t) => {
        if (t === "vip") return <Tag color="gold">Premium</Tag>;
        if (t === "thuongmai") return <Tag color="blue">Business</Tag>;
        return <Tag color="green">Basic</Tag>;
      },
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
          <Button type="link" onClick={() => handleRowClick(record)}>
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
      <h1 className="text-3xl font-bold text-center mb-8">Admin Hosting</h1>

      {/* Bộ lọc + nút + search */}
      <div className="flex justify-between mb-4">
        <div>
          <Button type="primary" onClick={handleCreateNew} className="mr-2">
            ➕ Tạo mới
          </Button>
          <Button className="mr-2">📥 Import</Button>
          <Button>📤 Export</Button>
        </div>
        <div className="flex gap-2">
          <Search
            placeholder="Tìm theo tên gói..."
            allowClear
            onSearch={(value) => setSearch(value)}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 250 }}
          />
          <Select
            value={type}
            onChange={(val) => setType(val)}
            style={{ width: 200 }}
            placeholder="-- Tất cả loại --"
          >
            <Option value="">-- Tất cả loại --</Option>
            <Option value="phothong">Basic</Option>
            <Option value="vip">Premium</Option>
            <Option value="thuongmai">Business</Option>
          </Select>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={hostings}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      {/* Drawer Form */}
      <Drawer
        title={selectedHosting ? "Chỉnh sửa Hosting" : "Tạo mới Hosting"}
        width={480}
        onClose={handleCloseDrawer}
        open={isDrawerOpen}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ type: "phothong", isDeleted: false }}
        >
          <Form.Item
            name="name"
            label="Tên gói"
            rules={[{ required: true, message: "Nhập tên gói" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="dungluong" label="Dung lượng">
            <Input />
          </Form.Item>

          <Form.Item name="subdomain" label="Băng thông">
            <Input />
          </Form.Item>

          <Form.Item name="mysql" label="MySQL">
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>

          <Form.Item name="price" label="Đơn giá" rules={[{ required: true, message: "Nhập đơn giá" }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item name="backup" label="Backup">
            <Input />
          </Form.Item>

          

          <Form.Item name="type" label="Loại gói">
            <Select>
              <Option value="phothong">Basic</Option>
              <Option value="vip">Premium</Option>
              <Option value="thuongmai">Business</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="isDeleted"
            label="Trạng thái"
            valuePropName="checked"
          >
            <Switch checkedChildren="Hoạt động" unCheckedChildren="Đã xóa" />
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

export default AdminHosting;
