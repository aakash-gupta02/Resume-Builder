import React from "react";

const BackgroundComponent = ({ children }) => {
  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden min-h-screen">
      {/* Grid Background Pattern */}
      <div
        className="fixed inset-0 bg-[linear-gradient(to_right,#1E293B_1px,transparent_1px),linear-gradient(to_bottom,#1E293B_1px,transparent_1px)] bg-[size:24px_24px] opacity-5"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Blurred Color Blobs */}
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-30" />
      <div className="fixed top-1/3 -right-40 w-96 h-96 bg-indigo-400 rounded-full blur-3xl opacity-30" />
      <div className="fixed bottom-20 left-1/4 w-80 h-80 bg-purple-400 rounded-full blur-3xl opacity-20" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundComponent;