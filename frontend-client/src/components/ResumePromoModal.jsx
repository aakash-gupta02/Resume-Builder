import { useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { DocumentTextIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const ResumePromoModal = ({ onClose }) => {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-blue-100 animate-scale-in"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-white/50 transition-colors"
        >
          <XMarkIcon className="h-6 w-6 text-white " />
        </button>

        {/* Decorative elements */}
        {/* <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
        <SparklesIcon className="absolute top-8 right-8 h-16 w-16 text-yellow-400 opacity-20" /> */}

        {/* Content */}
        <div className="p-8 text-center relative">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white shadow-md mb-4">
            <DocumentTextIcon className="h-8 w-8 text-blue-600" />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Craft Your Perfect Resume
          </h3>

          <p className="text-gray-600 mb-6">
            Impress employers with a professional resume tailored just for you.
            Our easy-to-use builder helps you stand out from the competition.
          </p>

          <div className="space-y-3">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="ml-2 text-sm text-gray-700">
                Professionally designed templates
              </p>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="ml-2 text-sm text-gray-700">
                Easy editing with real-time preview
              </p>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="ml-2 text-sm text-gray-700">
                Download in multiple formats
              </p>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => {
                navigate("/");
                onClose();
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-medium flex items-center justify-center gap-2"
            >
              <SparklesIcon className="h-5 w-5" />
              Create My Resume Now
            </button>

            <button
              onClick={onClose}
              className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePromoModal;
