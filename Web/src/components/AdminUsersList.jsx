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
const { Search } = Input;

function AdminUsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [form] = Form.useForm();

  // fetch API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/users");
      const data = res.data.data || res.data || [];
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Lỗi khi fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // mở form sửa
  const handleEdit = (user) => {
    setSelectedUser(user);
    form.setFieldsValue(user);
    setIsDrawerOpen(true);
  };

  // mở form thêm mới
  const handleCreateNew = () => {
    setSelectedUser(null);
    form.resetFields();
    setIsDrawerOpen(true);
  };

  // đóng drawer
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedUser(null);
  };

  // submit form
  const handleSubmit = async (values) => {
    try {
      if (selectedUser) {
        await axios.put(`/api/users/${selectedUser._id}`, values);
      } else {
        await axios.post("/api/users/register", values);
      }
      fetchUsers();
      setIsDrawerOpen(false);
    } catch (err) {
      console.error("Lỗi khi lưu user:", err);
    }
  };

  // xóa user
  const handleDelete = (user) => {
    confirm({
      title: "Bạn có chắc muốn xóa người dùng này?",
      content: user.email,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await axios.delete(`/api/users/${user._id}`);
          fetchUsers();
        } catch (err) {
          console.error("Lỗi khi xóa user:", err);
        }
      },
    });
  };

  // lọc dữ liệu theo role
  const filteredUsers = users.filter((u) => {
    const matchSearch =
      search === "" ||
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "all" || u.role === filterRole;
    return matchSearch && matchRole;
  });

  // cấu hình cột Table
  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (r) => <Tag color="blue">{r}</Tag>,
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
      <h1 className="text-3xl font-bold text-center mb-8">Admin Users</h1>

      {/* Thanh action */}
      <div className="flex justify-between mb-4">
        <Space>
          <Select
            value={filterRole}
            onChange={setFilterRole}
            style={{ width: 160 }}
          >
            <Option value="all">-- Tất cả role --</Option>
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
          <Search
            placeholder="Tìm theo tên hoặc email..."
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
        dataSource={filteredUsers}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      {/* Drawer Form */}
      <Drawer
        title={selectedUser ? "Chỉnh sửa User" : "Tạo mới User"}
        width={480}
        onClose={handleCloseDrawer}
        open={isDrawerOpen}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ isDeleted: false, role: "user" }}
        >
          <Form.Item
            name="name"
            label="Tên người dùng"
            rules={[{ required: true, message: "Nhập tên người dùng" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Nhập email" }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Nhập password" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="role" label="Role">
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
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

export default AdminUsersList;
