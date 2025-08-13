import React, { useState } from "react";

const CollapsibleSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-xl shadow-sm mb-6 transition-all duration-300 bg-white">
      <button
        type="button"
        className="flex justify-between items-center w-full p-5 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-t-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 transition-colors duration-300"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-gray-800">{title}</span>
        <svg
          className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-fit opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ willChange: "max-height, opacity" }}
      >
        <div className="p-5 text-gray-700">{children}</div>
      </div>
    </div>
  );
};

export default CollapsibleSection;
