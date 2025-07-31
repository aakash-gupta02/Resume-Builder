import React, { useState } from "react";
import { useResume } from "../context/ResumeContext";
import { TEMPLATES } from "./templates/index";

const ResumeNavbar = ({ handleDownload }) => {
  const { resumeData, setResumeData } = useResume();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleTemplateChange = (e) => {
    const selected = e.target.value;
    setResumeData((prev) => ({
      ...prev,
      template: {
        ...prev.template,
        theme: selected,
      },
    }));
    // console.log("Template changed to:", selected);
  };

  const handleChange = (e) => {
    setResumeData({
      ...resumeData,
      template: { theme: e.target.value },
    });
  };

  const menuButtons = (
    <>
      <button className="px-3 py-1.5 rounded hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-blue-300 w-full text-left">
        Dashboard
      </button>
      <button className="px-3 py-1.5 rounded text-white font-semibold bg-blue-600 hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-300 w-full text-left">
        Content
      </button>
      <button className="px-3 py-1.5 rounded hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-blue-300 w-full text-left">
        Customize
      </button>
      <button className="px-3 py-1.5 rounded hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-blue-300 w-full text-left">
        Links
      </button>
    </>
  );

  return (
    <nav className="bg-white border-b border-blue-200 px-4 sm:px-8 py-3 flex flex-col sm:flex-row justify-between items-center text-sm font-medium text-blue-900 shadow-sm relative">
      {/* Left menu (desktop) */}
      <div className="gap-2 sm:gap-6 w-full sm:w-auto justify-center sm:justify-start mb-2 sm:mb-0 hidden sm:flex">
        {menuButtons}
      </div>

      {/* Template Selector */}
      <div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Select Template</label>
          <select
            onChange={handleChange}
            value={resumeData?.template?.theme || Object.keys(TEMPLATES)[0]}
            className="border px-3 py-2 rounded-md w-full"
          >
            {Object.entries(TEMPLATES).map(([key, template]) => (
              <option key={key} value={key}>
                {template.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex sm:hidden w-full justify-between items-center mb-2">
        <button
          className="p-2 rounded hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Open menu"
        >
          <svg
            className="w-6 h-6 text-blue-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {resumeData?.title && (
          <span className="text-blue-800 text-sm font-medium truncate max-w-xs text-center">
            {resumeData.title}
          </span>
        )}

        {/* Download */}
        <div className="flex items-center">
          {handleDownload ? (
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-300 ml-2"
            >
              <span>Download</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                />
              </svg>
            </button>
          ) : (
            <button className="bg-blue-100 text-blue-400 px-4 py-2 rounded-md cursor-not-allowed ml-2">
              Download
            </button>
          )}
        </div>
      </div>

      {/* Dropdown menu for mobile */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-blue-200 shadow-md z-10 flex flex-col sm:hidden animate-fade-in">
          {menuButtons}
        </div>
      )}

      {/* Right side (desktop) */}
      <div className="flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto hidden sm:flex">
        {resumeData?.title && (
          <span className="text-blue-800 text-sm font-medium truncate max-w-xs text-center sm:text-left">
            {resumeData.title}
          </span>
        )}

        {handleDownload ? (
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <span>Download</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
              />
            </svg>
          </button>
        ) : (
          <button className="bg-blue-100 text-blue-400 px-4 py-2 rounded-md cursor-not-allowed">
            Download
          </button>
        )}
      </div>
    </nav>
  );
};

export default ResumeNavbar;
