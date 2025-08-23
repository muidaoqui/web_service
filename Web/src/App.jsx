import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ToolBar from "./components/ToolBar";
import Footer from "./components/Footer";

// Pages (Custom)
import Home from "./pages/custom/Home";
import Domain from "./pages/custom/Domain";
import Hosting from "./pages/custom/Hosting";
import Email from "./pages/custom/Email";
import Login from "./pages/custom/Login";
import Register from "./pages/custom/Register";

// Pages (Admin)
import AdminLogin from "./pages/admin/AdminLogin";
import AdminPanel from "./pages/admin/AdminPanel";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDomain from "./components/AdminDomain";
import AdminHosting from "./components/AdminHosting";
import AdminEmail from "./components/AdminEmail";

function App() {
  // Các route đơn giản chỉ hiển thị text
  const staticRoutes = [
    { path: "/web-design", label: "Web Design Page" },
    { path: "/templates", label: "Templates Page" },
    { path: "/blog", label: "Blog Page" },
    { path: "/maintenance", label: "Maintenance Page" },
    { path: "/recruitment", label: "Recruitment Page" },
    { path: "/contact", label: "Contact Page" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <ToolBar />

        {/* Nội dung trang */}
        <div className="flex-grow">
          <Routes>
            {/* Redirect root → /home */}
            <Route path="/" element={<Navigate to="/home" />} />

            {/* Public routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/domain" element={<Domain />} />
            <Route path="/hosting" element={<Hosting />} />
            <Route path="/email" element={<Email />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home/admin-login" element={<AdminLogin />} />

            {/* Static text pages */}
            {staticRoutes.map(({ path, label }) => (
              <Route key={path} path={path} element={<div>{label}</div>} />
            ))}

            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="panel" replace />} />
              <Route path="panel" element={<AdminPanel />} />
              <Route path="domain" element={<AdminDomain />} />
              <Route path="hosting" element={<AdminHosting />} />
              <Route path="email" element={<AdminEmail />} />
            </Route>
          </Routes>
        </div>

        {/* Footer luôn nằm dưới cùng */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
