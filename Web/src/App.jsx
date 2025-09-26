import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ToolBar from "./components/custom/ToolBar";
import Footer from "./components/custom/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages (Custom)
import Home from "./pages/custom/Home";
import Domain from "./pages/custom/Domain";
import Hosting from "./pages/custom/Hosting";
import Email from "./pages/custom/Email";
import Login from "./pages/custom/Login";
import Register from "./pages/custom/Register";
import WebDesign from "./pages/custom/WebDesign";
import Profile from "./pages/custom/Profile";
import CheckDomain from "./pages/custom/CheckDomain";
import DomainOrder from "./pages/custom/DomainOrder";
import HostingOrder from "./pages/custom/HostingOrder";
import Pay from "./pages/custom/Pay";
import DomainInfo from "./pages/custom/DomainInfo";
import Theme from "./pages/custom/Theme";
import ThemeDetail from "./pages/custom/ThemeDetail";

// Pages (Admin)
import AdminLogin from "./pages/admin/AdminLogin";
import AdminPanel from "./pages/admin/AdminPanel";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDomain from "./components/admin/AdminDomain";
import AdminHosting from "./components/admin/AdminHosting";
import AdminEmail from "./components/admin/AdminEmail";
import AdminTheme from "./components/admin/AdminTheme";

function App() {
  const staticRoutes = [
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

        <div className="flex-grow">
          <Routes>
            {/* Redirect root → /home */}
            <Route path="/" element={<Navigate to="/home" />} />

            {/* Public routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/domain" element={<Domain />} />
            <Route path="/hosting" element={<Hosting />} />
            <Route path="/email" element={<Email />} />
            <Route path="/templates" element={<Theme />} />
            <Route path="/templates/:id" element={<ThemeDetail />} />
            {/* Cần đăng nhập mới được vào (user hoặc admin) */}
            <Route
              path="/web-design"
              element={
                <ProtectedRoute roles={["user", "admin"]}>
                  <WebDesign />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute roles={["user", "admin"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/domain-order" 
              element={
                <ProtectedRoute roles={["user", "admin"]}>
                  <DomainOrder />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/hosting-order" 
              element={
                <ProtectedRoute roles={["user", "admin"]}>
                  <HostingOrder />
                </ProtectedRoute>
              } 
            />
            <Route
              path="/pay"
              element={
                <ProtectedRoute roles={["user", "admin"]}>
                  <Pay />
                </ProtectedRoute>
              }
            />
            <Route path="/check-domain" element={<CheckDomain />} />
            <Route path="/domain-info/:domain" element={<DomainInfo />} />
            {/* Auth pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home/admin-login" element={<AdminLogin />} />

            {/* Static routes */}
            {staticRoutes.map(({ path, label }) => (
              <Route key={path} path={path} element={<div>{label}</div>} />
            ))}

            {/* Admin routes (chỉ cho admin) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="panel" replace />} />
              <Route path="panel" element={<AdminPanel />} />
              <Route path="domain" element={<AdminDomain />} />
              <Route path="hosting" element={<AdminHosting />} />
              <Route path="email" element={<AdminEmail />} />
              <Route path="templates" element={<AdminTheme />} />
            </Route>
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
