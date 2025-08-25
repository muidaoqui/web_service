import React from "react";
import logo from '../../assets/logo.png'
import { FaRegHeart } from "react-icons/fa";
import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const doanhThuData = [
  { tháng: "T1", doanhThu: 4000 },
  { tháng: "T2", doanhThu: 3000 },
  { tháng: "T3", doanhThu: 5000 },
  { tháng: "T4", doanhThu: 4780 },
  { tháng: "T5", doanhThu: 5890 },
];

const hostingData = [
  { gói: "10GB", khách: 120 },
  { gói: "20GB", khách: 80 },
  { gói: "50GB", khách: 45 },
];

const domainData = [
  { name: ".com", value: 60 },
  { name: ".vn", value: 20 },
  { name: ".net", value: 10 },
  { name: "Khác", value: 10 },
];

const emailData = [
  { ngày: "T2", gửi: 200, nhận: 150 },
  { ngày: "T3", gửi: 250, nhận: 180 },
  { ngày: "T4", gửi: 300, nhận: 200 },
  { ngày: "T5", gửi: 280, nhận: 190 },
  { ngày: "T6", gửi: 320, nhận: 210 },
];

const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];

function AdminPanel() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Biểu đồ Doanh thu */}
      <div className="bg-white p-4 shadow rounded-2xl">
        <h2 className="text-lg font-semibold mb-2">Doanh thu theo tháng</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={doanhThuData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tháng" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="doanhThu" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ Hosting */}
      <div className="bg-white p-4 shadow rounded-2xl">
        <h2 className="text-lg font-semibold mb-2">Khách hàng theo gói Hosting</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={hostingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="gói" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="khách" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ Domain */}
      <div className="bg-white p-4 shadow rounded-2xl">
        <h2 className="text-lg font-semibold mb-2">Tỉ lệ Domain</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={domainData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {domainData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ Email Server */}
      <div className="bg-white p-4 shadow rounded-2xl">
        <h2 className="text-lg font-semibold mb-2">Email gửi/nhận</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={emailData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ngày" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="gửi" stroke="#ff7300" />
            <Line type="monotone" dataKey="nhận" stroke="#387908" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AdminPanel;
