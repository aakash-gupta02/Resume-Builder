import React, { useState } from "react";
import {
  CheckIcon,
  LinkIcon,
  ShareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import API from "../api/axiosInstance";

const ShareModal = ({ onClose, resumeTitle }) => {
  const [isPublic, setIsPublic] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const resumeLink = `https://yourresumeapp.com/resume/public/${resumeTitle
    .replace(/\s+/g, "-")
    .toLowerCase()}`;

  const togglePublicAccess = () => {
    setIsPublic(!isPublic);
    // Here you would typically make an API call to update the resume's public status
    try {
      API.patch(`/resumes/${resumeTitle}/public`);
    } catch (error) {
      console.error("Error toggling public access:", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(resumeLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-900">Share Resume</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Public Access Toggle */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Public Access</h4>
              <p className="text-sm text-gray-500 mt-1">
                {isPublic
                  ? "Anyone with the link can view this resume"
                  : "Only you can access this resume"}
              </p>
            </div>
            <button
              onClick={togglePublicAccess}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isPublic ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isPublic ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Share Options - Only visible when public */}
        {isPublic && (
          <div className="p-6">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-3">
                You can share this resume with the following link:
              </p>
              <div className="flex rounded-lg shadow-sm">
                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <LinkIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    readOnly
                    value={resumeLink}
                    className="block w-full rounded-l-lg border-gray-300 pl-10 text-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={copyToClipboard}
                  className="relative -ml-px inline-flex items-center space-x-2 rounded-r-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {isCopied ? (
                    <>
                      <CheckIcon className="h-5 w-5 text-green-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <ClipboardDocumentIcon className="h-5 w-5 text-gray-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs text-gray-500">
                Note: This resume will only be accessible when Public Access is
                enabled. You can disable it anytime to revoke access.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-xl flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
