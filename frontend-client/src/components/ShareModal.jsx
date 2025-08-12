import React, { useEffect, useState, useRef } from "react";
import {
  CheckIcon,
  LinkIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import API from "../api/axiosInstance";
import { useResume } from "../context/ResumeContext";

const ShareModal = ({ onClose, resumeid }) => {
  const { resumeData } = useResume();
  const modalRef = useRef(null);
  const [isPublic, setIsPublic] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const resumeLink = `${window.location.origin}/resume/preview/${resumeid}`;

  useEffect(() => {
    setIsPublic(resumeData?.publicAccess || false);
    
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [resumeData, onClose]);

  const togglePublicAccess = async () => {
    setIsLoading(true);
    try {
      await API.patch(`/resume/update/access/${resumeid}`);
      setIsPublic(!isPublic);
    } catch (error) {
      console.error("Error toggling public access:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(resumeLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-scale-in"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Share Resume</h3>
            <p className="text-sm text-gray-500 mt-1">
              {resumeData?.title || "Untitled Resume"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Public Access Toggle */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Public Access</h4>
              <p className="text-sm text-gray-500 mt-1">
                {isPublic
                  ? "Anyone with the link can view this resume"
                  : "Only you can access this resume"}
              </p>
            </div>
            <button
              onClick={togglePublicAccess}
              disabled={isLoading}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isPublic ? 'bg-blue-600' : 'bg-gray-200'
              } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
                  isPublic ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Share Options - Only visible when public */}
        {isPublic && (
          <div className="p-6">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                <LinkIcon className="h-4 w-4" />
                Shareable link
              </p>
              <div className="flex rounded-lg shadow-sm">
                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                  <input
                    type="text"
                    readOnly
                    value={resumeLink}
                    className="block w-full rounded-l-lg border-gray-300 pl-3 pr-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 truncate"
                    onClick={(e) => e.target.select()}
                  />
                </div>
                <button
                  onClick={copyToClipboard}
                  className="relative -ml-px inline-flex items-center space-x-2 rounded-r-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                >
                  {isCopied ? (
                    <>
                      <CheckIcon className="h-5 w-5 text-green-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <ClipboardDocumentIcon className="h-5 w-5 text-gray-500" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-600">
                <span className="font-medium">Note:</span> When public access is enabled, 
                anyone with this link can view your resume. Disable it anytime to revoke access.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-xl flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;