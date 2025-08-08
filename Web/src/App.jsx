import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ToolBar from './components/ToolBar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Domain from './pages/Domain';
import Hosting from './pages/Hosting'
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <ToolBar />
        
        {/* Nội dung trang */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/domain" element={<Domain />} />
            <Route path="/hosting" element={<Hosting />} />
            <Route path="/email" element={<div>Email Server Page</div>} />
            <Route path="/web-design" element={<div>Web Design Page</div>} />
            <Route path="/templates" element={<div>Templates Page</div>} />
            <Route path="/blog" element={<div>Blog Page</div>} />
            <Route path="/maintenance" element={<div>Maintenance Page</div>} />
            <Route path="/recruitment" element={<div>Recruitment Page</div>} />
            <Route path="/contact" element={<div>Contact Page</div>} />
          </Routes>
        </div>

        {/* Footer luôn nằm dưới cùng */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
