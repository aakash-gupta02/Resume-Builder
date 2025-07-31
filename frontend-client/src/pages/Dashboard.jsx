import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  DocumentTextIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Tooltip } from "@mui/material";

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await API.get("/resume/all");
        setResumes(res.data.resume || []);
      } catch (err) {
        console.error("Failed to load resumes", err);
      }
    };

    fetchResumes();
  }, [token]);

  const openDeleteModal = (id) => {
    setResumeToDelete(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setResumeToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/resume/delete/${resumeToDelete}`);
      setResumes(resumes.filter((resume) => resume._id !== resumeToDelete));
      closeDeleteModal();
    } catch (err) {
      console.error("Failed to delete resume", err);
    }
  };

  const handleEditTitle = async (id, e) => {
    e.stopPropagation();
    try {
      await API.put(`/resume/update/${id}`, { title: newTitle });
      setResumes(
        resumes.map((resume) =>
          resume._id === id ? { ...resume, title: newTitle } : resume
        )
      );
      setEditingId(null);
    } catch (err) {
      console.error("Failed to update title", err);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Resume
              </h3>
              <button
                onClick={closeDeleteModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this resume? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-800">Your Resumes</h1>
            <p className="text-blue-600">
              Create, manage and edit your resumes
            </p>
          </div>
          <button
            onClick={() => navigate("/resume/create")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition-all flex items-center gap-2"
          >
            <DocumentTextIcon className="h-5 w-5" />
            New Resume
          </button>
        </div>

        {/* Resume Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              onClick={() =>
                !editingId && navigate(`/resume/edit/${resume._id}`)
              }
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer border border-blue-100 relative group"
            >
              {/* Card Content */}
              <div className="p-5 h-full flex flex-col">
                {/* Title and Menu */}
                <div className="flex justify-between items-start mb-3">
                  {editingId === resume._id ? (
                    <div className="flex items-center gap-2 w-full">
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 border border-blue-200 rounded px-3 py-1 text-sm"
                        autoFocus
                      />
                      <button
                        onClick={(e) => handleEditTitle(resume._id, e)}
                        className="bg-blue-100 text-blue-600 p-1 rounded hover:bg-blue-200"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal(resume._id);
                        }}
                        className="bg-red-100 text-red-600 p-1 rounded hover:bg-red-200"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-lg font-semibold text-blue-800 pr-6">
                        {resume.title}
                      </h2>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="dropdown relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingId(
                                editingId === resume._id ? null : resume._id
                              );
                              setNewTitle(resume.title);
                            }}
                            className="p-1 rounded-full hover:bg-blue-50 text-blue-600"
                          >
                            <EllipsisVerticalIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Preview Box */}
                <div className="bg-blue-50 rounded-lg h-32 flex-1 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="text-blue-400 text-sm mb-1">Preview</div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/resume/preview/${resume._id}`);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                    >
                      View Full
                    </button>
                  </div>
                </div>

                {/* Footer with date and actions */}
                <div className="flex justify-between items-center pt-3 border-t border-blue-100">
                  <span className="text-xs text-blue-500">
                    {new Date(resume.updatedAt).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <Tooltip title="Edit Resume" arrow>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/resume/edit/${resume._id}`);
                        }}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                    </Tooltip>
                    <Tooltip title="Download PDF" arrow>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/resume/preview/${resume._id}`);
                        }}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50"
                      >
                        <ArrowDownTrayIcon className="h-4 w-4" />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {resumes.length === 0 && (
          <div className="text-center py-16">
            <div className="text-blue-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-blue-800 mb-2">
              No resumes yet
            </h3>
            <p className="text-blue-600 mb-4">
              Create your first resume to get started
            </p>
            <button
              onClick={() => navigate("/resume/create")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md flex items-center gap-2 mx-auto"
            >
              <DocumentTextIcon className="h-5 w-5" />
              Create Resume
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
