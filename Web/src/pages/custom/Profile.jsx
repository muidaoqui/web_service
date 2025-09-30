import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, Modal, Table, Tag, Space, message } from "antd";
import api from "../../utils/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const [pwModal, setPwModal] = useState(false);
  const [orderModal, setOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch user info & orders
  useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const resUser = await api.get("/users/me");
      setUser(resUser.data.user);
      form.setFieldsValue(resUser.data.user);
      const resOrders = await api.get("/orders/my", {
        headers: { "Cache-Control": "no-cache" }
      });
      setOrders(resOrders.data.data || []);
    } catch (err) {
      console.error(err);
      message.error("Không thể tải thông tin cá nhân hoặc đơn hàng");
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, [editMode]);

useEffect(() => {
  console.log("[Profile] orders state:", orders);
}, [orders]);

  // Sửa thông tin cá nhân
  const handleSave = async (values) => {
    try {
      await api.put("/users/me", values);
      message.success("Cập nhật thành công");
      setEditMode(false);
    } catch (err) {
      message.error("Cập nhật thất bại");
    }
  };

  // Đổi mật khẩu
  const handleChangePw = async (values) => {
    try {
      await api.put("/users/me", values);
      message.success("Đổi mật khẩu thành công");
      setPwModal(false);
    } catch (err) {
      message.error(err.response?.data?.message || "Đổi mật khẩu thất bại");
    }
  };

  // Xem chi tiết order
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setOrderModal(true);
  };

  // Table columns cho orders
  const orderColumns = [
    { title: "Mã đơn", dataIndex: "_id", key: "_id" },
    { title: "Tổng tiền", dataIndex: "totalAmount", key: "totalAmount", render: v => v.toLocaleString() + " ₫" },
    { title: "Phương thức", dataIndex: "paymentMethod", key: "paymentMethod", render: v => <Tag color="blue">{v}</Tag> },
    { title: "Trạng thái", dataIndex: "status", key: "status", render: v => <Tag color={v === "paid" ? "green" : v === "cancelled" ? "red" : "orange"}>{v}</Tag> },
    { title: "Ngày tạo", dataIndex: "createdAt", key: "createdAt", render: v => new Date(v).toLocaleString() },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => handleViewOrder(record)}>Xem chi tiết</Button>
      ),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto py-8 mt-30">
      <Card title="Thông tin cá nhân" loading={loading} className="mb-6">
        {user && !editMode && (
          <div className="space-y-2">
            <p><b>Tên:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Địa chỉ:</b> {user.address || "Chưa cập nhật"}</p>
            <p><b>Số điện thoại:</b> {user.phone || "Chưa cập nhật"}</p>
            <Space>
              <Button type="primary" onClick={() => setEditMode(true)}>Sửa thông tin</Button>
              <Button onClick={() => setPwModal(true)}>Đổi mật khẩu</Button>
            </Space>
          </div>
        )}
        {user && editMode && (
          <Form form={form} layout="vertical" onFinish={handleSave} initialValues={user}>
            <Form.Item name="name" label="Tên" rules={[{ required: true, message: "Nhập tên" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Nhập email hợp lệ" }]}>
              <Input disabled />
            </Form.Item>
            <Form.Item name="address" label="Địa chỉ">
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Số điện thoại">
              <Input />
            </Form.Item>
            <Space>
              <Button htmlType="submit" type="primary">Lưu</Button>
              <Button onClick={() => setEditMode(false)}>Hủy</Button>
            </Space>
          </Form>
        )}
      </Card>

      <Card title="Danh sách đơn hàng" loading={loading}>
        <Table columns={orderColumns} dataSource={orders} rowKey="_id" pagination={{ pageSize: 5 }} />
      </Card>

      {/* Modal đổi mật khẩu */}
      <Modal
        title="Đổi mật khẩu"
        open={pwModal}
        onCancel={() => setPwModal(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleChangePw}>
          <Form.Item name="oldPassword" label="Mật khẩu cũ" rules={[{ required: true, message: "Nhập mật khẩu cũ" }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="newPassword" label="Mật khẩu mới" rules={[{ required: true, message: "Nhập mật khẩu mới" }]}>
            <Input.Password />
          </Form.Item>
          <Space>
            <Button htmlType="submit" type="primary">Đổi mật khẩu</Button>
            <Button onClick={() => setPwModal(false)}>Hủy</Button>
          </Space>
        </Form>
      </Modal>

      {/* Modal chi tiết order */}
      <Modal
        title="Chi tiết đơn hàng"
        open={orderModal}
        onCancel={() => setOrderModal(false)}
        footer={null}
        width={600}
      >
        {selectedOrder && (
          <div>
            <p><b>Mã đơn:</b> {selectedOrder._id}</p>
            <p><b>Ngày tạo:</b> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
            <p><b>Phương thức thanh toán:</b> {selectedOrder.paymentMethod}</p>
            <p><b>Tổng tiền:</b> {selectedOrder.totalAmount.toLocaleString()} ₫</p>
            <p><b>Trạng thái:</b> <Tag color={selectedOrder.status === "paid" ? "green" : selectedOrder.status === "cancelled" ? "red" : "orange"}>{selectedOrder.status}</Tag></p>
            <b>Danh sách sản phẩm:</b>
            <Table
              columns={[
                { title: "Loại", dataIndex: "productType", key: "productType" },
                { title: "Tên", dataIndex: "name", key: "name" },
                { title: "Giá", dataIndex: "price", key: "price", render: v => v.toLocaleString() + " ₫" },
                { title: "Số năm", dataIndex: "duration", key: "duration" },
              ]}
              dataSource={selectedOrder.items}
              rowKey={(r) => r.productId}
              pagination={false}
              size="small"
            />
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Profile;
