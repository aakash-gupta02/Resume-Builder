import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  LayoutDashboard,
  Star,
  Info,
  LogOut,
} from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleProfileModal = () => {
    setProfileModalOpen(!profileModalOpen);
  };

  const handleLogout = () => {
    logout();
    setProfileModalOpen(false);
    setMenuOpen(false);
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileModalOpen && !event.target.closest(".profile-button")) {
        setProfileModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileModalOpen]);

  return (
    <div className="w-full flex justify-center fixed top-0 z-50 py-4 bg-transparent">
      {/* Floating Glass Container */}
      <div className="flex justify-between items-center w-[95%] max-w-7xl px-4 sm:px-8 py-3 rounded-2xl backdrop-blur-xl shadow-lg border border-white/20 font-medium transition-all duration-300 bg-white/30">
        {/* Logo */}
        <Link to="/" className="text-lg font-bold text-blue-700">
          JobFolio
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex sm:items-center gap-6 text-gray-700 sm:text-sm">
          <Link to="/" className="relative group">
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/services" className="relative group">
            Services
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/our-work" className="relative group">
            Our Work
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/contact" className="relative group">
            Contact Us
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
        </div>

        {user ? (
          <div className="hidden sm:flex items-center gap-4">
            <Link
              to="/dashboard"
              className="text-sm flex items-center gap-2 border border-blue-600 text-blue-600 px-6 py-2 rounded-full cursor-pointer hover:bg-blue-600 hover:text-white hover:shadow-md transition-all"
            >
              Dashboard
            </Link>

            <button
              onClick={toggleProfileModal}
              className="profile-button w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 hover:bg-blue-200 transition-all relative"
            >
              <User size={20} />

              {profileModalOpen && (
                <div className="absolute top-12 right-0 w-64 bg-white/95 backdrop-blur-lg rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  {/* User Details */}
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-lg">
                      {user?.username?.[0]?.toUpperCase() || <User size={20} />}
                    </div>

                    <div className="text-left">
                      <div className="font-semibold text-gray-800 truncate">
                        {user?.username || "User"}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {user?.email || ""}
                      </div>
                    </div>
                  </div>
                  <hr className="my-2 border-gray-200" />
                  {/* Options */}
                  <div>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50"
                      onClick={() => setProfileModalOpen(false)}
                    >
                      <LayoutDashboard className="text-blue-500" size={16} />
                      Dashboard
                    </Link>
                    <Link
                      to="/reviews"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50"
                      onClick={() => setProfileModalOpen(false)}
                    >
                      <Star className="text-blue-500" size={16} />
                      Reviews
                    </Link>
                    <Link
                      to="/about"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50"
                      onClick={() => setProfileModalOpen(false)}
                    >
                      <Info className="text-blue-500" size={16} />
                      About Us
                    </Link>
                  </div>

                  <hr className="border-gray-200 my-2" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 text-left"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </button>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full cursor-pointer hover:scale-105 hover:shadow-md transition-all"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm flex items-center gap-2 border border-blue-600 text-blue-600 px-6 py-2 rounded-full cursor-pointer hover:bg-blue-600 hover:text-white hover:shadow-md transition-all"
            >
              Register
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(true)}>
            <Menu size={26} className="text-blue-700" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 w-64 h-fit rounded-2xl m-2 bg-white/90 shadow-xl border-l border-gray-200 text-gray-800 flex flex-col gap-6 p-6 pt-20 transition-transform duration-300 sm:hidden z-50 ${
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
        <div className="flex flex-col gap-4">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/services"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-600 transition-colors"
          >
            Services
          </Link>
          <Link
            to="/our-work"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-600 transition-colors"
          >
            Our Work
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-600 transition-colors"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Auth Buttons */}
        {user ? (
          <div className="flex flex-col gap-4">
            <Link
              to="/dashboard"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>

            <div className="flex items-center gap-3 px-2 py-3 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-lg">
                {user?.username?.[0]?.toUpperCase() || <User size={20} />}
              </div>

              <div className="text-left">
                <div className="font-semibold text-gray-800 truncate">
                  {user?.username || "User"}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {user?.email || ""}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Link
                to="/reviews"
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <Star size={18} className="text-blue-500" />
                Reviews
              </Link>
              <Link
                to="/about"
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <Info size={18} className="text-blue-500" />
                About Us
              </Link>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-center hover:bg-blue-700 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-full text-center hover:bg-blue-600 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 sm:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
