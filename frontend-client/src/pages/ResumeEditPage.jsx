import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { useResume } from "../context/ResumeContext";
import { useAuth } from "../context/AuthContext";

import ResumePreview from "../components/resume/ResumePreview";

import MyResumePDF from "../components/resume/MyResumePDF";
import ResumeForm from "../components/ResumeForm";

const ResumeEditPage = () => {
  const { id } = useParams();
  const { setResumeData, resumeData } = useResume();
  const { token } = useAuth();
  const navigate = useNavigate();

  const printref = useRef(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/resume/get/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(res.data);

        setResumeData(res.data.resume);
      } catch (err) {
        console.error("Error loading resume:", err);
      }
    };

    fetchResume();
    return () => {
      setResumeData({});
    };
  }, [id, setResumeData]);

  const updateLoad = {
    ...resumeData,
    // userID:
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/resume/update/${id}`,
        updateLoad,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Updated Successfully");

      console.log(res);
    } catch (error) {
      console.error("Error loading resume:", error);
    }
  };

  const handleDownload = () => {
    navigate(`/resume/preview/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#f5f4f9]">
      {/* Top Navbar */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center text-sm font-medium text-gray-800 shadow-sm">
        <div className="flex gap-6">
          <button className="px-3 py-1.5 rounded hover:bg-gray-100 transition">
            Dashboard
          </button>
          <button className="px-3 py-1.5 rounded text-pink-600 font-semibold bg-pink-50">
            Content
          </button>
          <button className="px-3 py-1.5 rounded hover:bg-gray-100 transition">
            Customize
          </button>
          <button className="px-3 py-1.5 rounded hover:bg-gray-100 transition">
            Links
          </button>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-700 text-sm font-medium">
            {resumeData.title}
          </span>
          <button
            onClick={handleDownload}
            className="bg-[#2b1d4a] text-white px-4 py-2 rounded-md hover:bg-[#3a2961] flex items-center gap-1"
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
        </div>
      </div>

      {/* Main Section */}
      <div className="flex gap-6 px-8 py-10">
        {/* Left Form Section Box */}
        <div className="w-[50%] bg-white p-6 rounded-lg shadow-md overflow-y-auto h-[88vh] space-y-4">
          <ResumeForm />
          <button
            onClick={handleUpdate}
            className="w-full bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          >
            Update Resume
          </button>
        </div>

        {/* Right Preview Section Box */}
        <div
          ref={printref}
          className="w-[50%] bg-white p-6 rounded-lg shadow-md overflow-y-auto h-[88vh]"
        >
          <ResumePreview />
        </div>
      </div>
    </div>
  );
};

export default ResumeEditPage;
