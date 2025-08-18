import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import { TEMPLATES } from "./templates/index";
import ShareModal from "./ShareModal";
import {
  ArrowDownTrayIcon,
  Squares2X2Icon,
  PencilSquareIcon,
  AdjustmentsHorizontalIcon,
  ShareIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import InfoModal from "./InfoModal";

const ResumeNavbar = ({ handleDownload }) => {
  const navigate = useNavigate();
  const { resumeData, setResumeData } = useResume();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Content");

  const handleTemplateChange = (e) => {
    const selected = e.target.value;
    setResumeData((prev) => ({
      ...prev,
      template: {
        ...prev.template,
        theme: selected,
      },
    }));
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === "Dashboard") {
      navigate("/dashboard");
    }
    if (menuOpen) setMenuOpen(false);
  };

  const menuButtons = (
    <>
      <button
        onClick={() => handleTabClick("Dashboard")}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
          activeTab === "Dashboard"
            ? "bg-blue-100 text-blue-700"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        <Squares2X2Icon className="h-5 w-5" />
        <span>Dashboard</span>
      </button>
      <button
        onClick={() => handleTabClick("Content")}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
          activeTab === "Content"
            ? "bg-blue-100 text-blue-700"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        <PencilSquareIcon className="h-5 w-5" />
        <span>Content</span>
      </button>
      <button
        onClick={() => handleTabClick("Customize")}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
          activeTab === "Customize"
            ? "bg-blue-100 text-blue-700"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        <AdjustmentsHorizontalIcon className="h-5 w-5" />
        <span>Customize</span>
      </button>
      <button
        onClick={() => {
          handleTabClick("Share");
          setShowShareModal(true);
        }}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
          activeTab === "Share"
            ? "bg-blue-100 text-blue-700"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        <ShareIcon className="h-5 w-5" />
        <span>Share</span>
      </button>
        <InfoModal />

    </>
  );

  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex flex-col sm:flex-row justify-between items-center sticky top-0 z-40">
        {/* Left menu (desktop) */}
        <div className="hidden sm:flex items-center gap-1 w-full max-w-2xl">
          {menuButtons}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden w-full justify-between items-center">
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Open menu"
          >
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6 text-gray-700" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-gray-700" />
            )}
          </button>

          {resumeData?.title && (
            <span className="text-gray-800 font-medium truncate max-w-[180px] text-center">
              {resumeData.title}
            </span>
          )}

          {/* Download */}
          <div className="flex items-center">
            {handleDownload ? (
              <button
                onClick={handleDownload}
                className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition flex items-center gap-1 text-sm"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Download</span>
              </button>
            ) : (
              <button className="bg-gray-100 text-gray-400 px-3 py-1.5 rounded-lg cursor-not-allowed flex items-center gap-1 text-sm">
                <ArrowDownTrayIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Download</span>
              </button>
            )}
          </div>
        </div>

        {/* Template Selector and Desktop Download */}
        <div className="flex items-center gap-4 w-full sm:w-auto mt-3 sm:mt-0">
          <div className="w-full sm:w-48">
            <select
              onChange={handleTemplateChange}
              value={resumeData?.template?.theme || Object.keys(TEMPLATES)[0]}
              className="w-full text-sm border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
            >
              {Object.entries(TEMPLATES).map(([key, template]) => (
                <option key={key} value={key}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden sm:flex">
            {handleDownload ? (
              <button
                onClick={handleDownload}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 text-sm"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                <span>Download</span>
              </button>
            ) : (
              <button className="bg-gray-100 text-gray-400 px-4 py-2 rounded-lg cursor-not-allowed flex items-center gap-2 text-sm">
                <ArrowDownTrayIcon className="h-4 w-4" />
                <span>Download</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 sm:hidden p-4 space-y-2">
            {menuButtons}
          </div>
        )}
      </nav>

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          onClose={() => setShowShareModal(false)}
          resumeid={resumeData?._id || "My Resume"}
        />
      )}
    </>
  );
};

export default ResumeNavbar;