import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import WhatWeDo from "./pages/WhatWeDo.jsx";
import Testimonials from "./pages/Testimonials.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[background: #1A1A1A] text-slate-200 antialiased">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
