import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ToolBar from './components/ToolBar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Domain from './pages/Domain'; 
function App() {
  return (
    <>
      <BrowserRouter>
        <ToolBar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/domain" element={<Domain />} />
          <Route path="/hosting" element={<div>Hosting Page</div>} />
          <Route path="/email" element={<div>Email Server Page</div>} />
          <Route path="/web-design" element={<div>Web Design Page</div>} />
          <Route path="/templates" element={<div>Templates Page</div>} />
          <Route path="/blog" element={<div>Blog Page</div>} />
          <Route path="/maintenance" element={<div>Maintenance Page</div>} />
          <Route path="/recruitment" element={<div>Recruitment Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
        </Routes>
        <Footer />
      </BrowserRouter>
      

    </>
  );
}

export default App;
