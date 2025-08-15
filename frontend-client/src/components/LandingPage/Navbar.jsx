import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Lucide icons

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full flex justify-center fixed top-4 z-50">
      {/* Floating Glass Container */}
      <div
        className="flex justify-between items-center w-[95%] max-w-7xl px-4 sm:px-8 py-3
        rounded-2xl backdrop-blur-xl  shadow-lg border border-white/20
        font-medium transition-all duration-300"
      >
        {/* Logo */}
        <div className="text-lg font-bold text-blue-700">JobFolio</div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex sm:items-center gap-6 text-gray-700 sm:text-sm">
          <a href="#" className="relative group">
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full"></span>
          </a>
          <a href="#services" className="relative group">
            Services
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full"></span>
          </a>
          <a href="#our-work" className="relative group">
            Our Work
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full"></span>
          </a>
          <a href="#contact-us" className="relative group">
            Contact Us
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full"></span>
          </a>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="/login"
            className="text-sm flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full
            cursor-pointer hover:scale-105 hover:shadow-md transition-all"
          >
            Login
          </a>
          <a
            href="/register"
            className="text-sm flex items-center gap-2 border border-blue-600 text-blue-600 px-6 py-2 rounded-full
            cursor-pointer hover:bg-blue-600 hover:text-white hover:shadow-md transition-all"
          >
            Register
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(true)}>
            <Menu size={26} className="text-blue-700" />
          </button>
        </div>

        {/* Mobile Sidebar Menu */}
        <div
          className={`fixed top-0 right-0 w-64 h-full bg-white/40 backdrop-blur-2xl shadow-xl
          border-l border-white/20 text-gray-800 flex flex-col gap-6 p-6 pt-20
          transition-transform duration-300 sm:hidden ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close Button */}
          <button
            className="absolute top-5 right-5 text-blue-700"
            onClick={() => setMenuOpen(false)}
          >
            <X size={26} />
          </button>

          {/* Mobile Menu Items */}
          <a href="#" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#our-work" onClick={() => setMenuOpen(false)}>Our Work</a>
          <a href="#contact-us" onClick={() => setMenuOpen(false)}>Contact Us</a>

          {/* Mobile Auth Buttons */}
          <a
            href="/login"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full text-center"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </a>
          <a
            href="/register"
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-full text-center hover:bg-blue-600 hover:text-white transition-all"
            onClick={() => setMenuOpen(false)}
          >
            Register
          </a>
        </div>


      </div>
    </div>
  );
};

export default Navbar;
