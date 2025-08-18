import { useState, useEffect, useRef } from "react";
import {
  InformationCircleIcon,
  XMarkIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

const InfoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDelayedMessage, setShowDelayedMessage] = useState(false);
  const modalRef = useRef(null);
  const delayedMessageRef = useRef(null);

  // Show message after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDelayedMessage(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  // Event delegation for clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (
        delayedMessageRef.current &&
        !delayedMessageRef.current.contains(event.target) &&
        !event.target.closest('button[aria-label="Information"]')
      ) {
        setShowDelayedMessage(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setShowDelayedMessage(false);
  };

  return (
    <div className="relative">
      {/* Info Icon Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors shadow-sm"
        aria-label="Information"
      >
        <InformationCircleIcon className="h-5 w-5" />
      </button>

      {/* Delayed Message */}
      {showDelayedMessage && (
        <div
          ref={delayedMessageRef}
          className="absolute right-0 mt-2 w-64 bg-white p-3 rounded-lg shadow-md border border-gray-100 z-50 animate-fade-in"
        >
          <div className="flex justify-between items-start">
            <p className="text-sm text-gray-700 pr-4">
              The preview may not render perfectly on small screens, but your
              downloaded PDF will look professional.
            </p>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 ml-2"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-xl max-w-md w-full"
          >
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <InformationCircleIcon className="h-6 w-6 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    About Resume Preview
                  </h3>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3 text-gray-700 text-sm">
                <p>
                  The on-screen preview may not display perfectly on all devices
                  due to varying screen sizes & in capabilities of my skills.
                </p>

                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <p className="font-medium text-blue-800">
                    Rest assured: Your downloaded PDF will maintain perfect
                    formatting and look professional.
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CodeBracketIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      This project is open source!
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-600">
                    We welcome contributions to improve the preview rendering.
                  </p>
                  <a
                    href="https://github.com/yourusername/your-repo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 px-3 py-1.5 bg-gray-800 text-white rounded text-xs hover:bg-gray-700 transition-colors"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default InfoModal;