import React from "react";

const AppleTerminal = ({ children }) => {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl shadow-2xl border border-gray-200 overflow-hidden bg-white/20 backdrop-blur-sm">
      {/* Header bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border-b border-gray-700">
        {/* Control buttons */}
        <span className="w-3 h-3 rounded-full bg-red-500"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
        <span className="w-3 h-3 rounded-full bg-green-500"></span>
        {/* Title */}
        <div className="flex-1 text-center text-gray-400 text-sm font-medium">
          {typeof window !== "undefined" ? window.location.origin : "ResumePreview.js"}
        </div>
      </div>

      {/* Content area - optimized for image display */}
      <div className="relative" style={{ paddingBottom: '130%' }}> {/* A4 aspect ratio */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="w-full h-full flex items-center justify-center">
            {children
              // className: "w-full h-full object-contain max-w-full max-h-full shadow-sm"
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppleTerminal;