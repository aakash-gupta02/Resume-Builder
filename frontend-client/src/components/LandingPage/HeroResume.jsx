import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const ImageResumePreview = () => {
  const resumeImageUrl =
    "https://template.canva.com/EAGDNOIuRgo/1/0/1131w-rXppN-W2O80.jpg";

  // Fallback component if image fails to load
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="relative w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Image container with fixed aspect ratio (A4: 1.414) */}
      <div className="relative" style={{ paddingBottom: "141.4%" }}>
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
            <div className="text-center p-6">
              <p className="mb-4">Resume preview couldn't be loaded</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center mx-auto">
                <PencilSquareIcon className="w-5 h-5 mr-2" />
                Upload Resume Image
              </button>
            </div>
          </div>
        ) : (
          <>
            <img
              src={resumeImageUrl}
              alt="Professional Resume"
              className="absolute inset-0 w-full h-full object-contain"
              onError={() => setImageError(true)}
            />
            {/* Interactive overlay */}
            <div className="absolute inset-0 bg-black/20 bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
              <button className="bg-white px-5 py-3 rounded-lg shadow-md flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <PencilSquareIcon className="w-5 h-5 mr-2" />
                <span>Customize This Template</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageResumePreview;
