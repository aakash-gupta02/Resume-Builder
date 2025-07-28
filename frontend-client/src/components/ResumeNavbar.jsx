import React, { useState } from "react";

const ResumeNavbar = ({ resumeData, handleDownload }) => {
  const [menuOpen, setMenuOpen] = useState(false);

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
      {/* Left side buttons (hidden on small screens) */}
      <div className="gap-2 sm:gap-6 w-full sm:w-auto justify-center sm:justify-start mb-2 sm:mb-0 hidden sm:flex">
        {menuButtons}
      </div>
      {/* Menu button (visible on small screens) */}
      <div className="flex sm:hidden w-full justify-between items-center mb-2">
        <button
          className="p-2 rounded hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Open menu"
        >
          {/* Hamburger icon */}
          <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {resumeData && (
          <span className="text-blue-800 text-sm font-medium truncate max-w-xs text-center">
            {resumeData.title}
          </span>
        )}
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
      {/* Dropdown menu for small screens */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-blue-200 shadow-md z-10 flex flex-col sm:hidden animate-fade-in">
          {menuButtons}
        </div>
      )}
      {/* Right side (visible on desktop) */}
      <div className="flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto hidden sm:flex">
        {resumeData && (
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
