
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import AdminUsersList from "../../components/admin/AdminUsersList";
import AdminDomain from "../../components/admin/AdminDomain";
import AdminHosting from "../../components/admin/AdminHosting";
import AdminTheme from "../../components/admin/AdminTheme";
const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28", "#AA33FF"];

function AdminPanel() {
  const [domains, setDomains] = useState([]);
  const [users, setUsers] = useState([]);
  const [hostings, setHostings] = useState([]);
  const [themes, setThemes] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resDomains = await axios.get("/api/domains");
        const resUsers = await axios.get("/api/users", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const resHostings = await axios.get("/api/hostings");
        const resThemes = await axios.get("/api/themes");
        setDomains(resDomains.data.data || []);
        setUsers(resUsers.data.data || []);
        setHostings(resHostings.data.data.hostings || []);
        setThemes(resThemes.data.data || []);
      } catch (err) {
        console.error("Lỗi fetch data:", err);
      }
    };
    fetchData();
  }, [token]);

  // --- DOMAIN DATA ---
  const domainData = [
    { name: "Quốc tế", value: domains.filter(d => d.type === "qt").length },
    { name: ".VN", value: domains.filter(d => d.type === "vn").length },
    { name: "Khác", value: domains.filter(d => d.type === "khac").length },
  ];

  const revenueDomainData = domains.map((d, i) => ({
    tháng: `T${i + 1}`,
    doanhThu: Number(d.newPrice) || 0
  }));

  // --- USER DATA ---
  const userRoleData = [
    { role: "Admin", count: users.filter(u => u.role === "admin").length },
    { role: "User", count: users.filter(u => u.role === "user").length },
  ];

  const emailProviderData = [
    { provider: "Gmail", count: users.filter(u => u.email?.includes("@gmail.com")).length },
    { provider: "Yahoo", count: users.filter(u => u.email?.includes("@yahoo.com")).length },
    { provider: "Khác", count: users.filter(u => u.email && !u.email.includes("@gmail.com") && !u.email.includes("@yahoo.com")).length },
  ];

  // --- HOSTING DATA ---
  const hostingPlanData = hostings.map(h => ({
    gói: h.name || "Không rõ",
    khách: Number(h.customerCount) || 0,
  }));

  const revenueHostingData = hostings.map((h, i) => ({
    tháng: `T${i + 1}`,
    doanhThu: Number(h.price) || 0,
  }));

  // --- THEME DATA ---
  const themeData = themes.map(t => ({
    name: t.name || "Không rõ",
    lượtDùng: Number(t.usedCount) || 0,
  }));

  return (
    <div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 mt-30">
        {/* Biểu đồ Doanh thu Domain */}
        <div className="bg-black p-4 shadow rounded-2xl">
          <h2 className="text-lg font-semibold mb-2 text-white">Doanh thu Domain</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueDomainData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tháng" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="doanhThu" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ Doanh thu Hosting */}
        <div className="bg-black p-4 shadow rounded-2xl">
          <h2 className="text-lg font-semibold mb-2 text-white">Doanh thu Hosting</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueHostingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tháng" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="doanhThu" stroke="#00C49F" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ Role User */}
        <div className="bg-black p-4 shadow rounded-2xl">
          <h2 className="text-lg font-semibold mb-2 text-white">Người dùng theo Role</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={userRoleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="role" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ Email Provider */}
        <div className="bg-black p-4 shadow rounded-2xl">
          <h2 className="text-lg font-semibold mb-2 text-white">Email theo nhà cung cấp</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={emailProviderData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="provider" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#ff7300" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ Domain Pie */}
        <div className="bg-black p-4 shadow rounded-2xl">
          <h2 className="text-lg font-semibold mb-2 text-white">Tỉ lệ Domain</h2>
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
      </div>

      {/* Bảng quản lý */}
      <div className="mt-6 space-y-6">
        <AdminUsersList />
        <AdminTheme />
        <AdminDomain />
        <AdminHosting />
      </div>
    </div>
  );
}

export default AdminPanel;

