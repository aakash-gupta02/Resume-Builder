import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { useResume } from "../context/ResumeContext";
import { useAuth } from "../context/AuthContext";

import ResumePreview from "../components/resume/ResumePreview";

import ResumeForm from "../components/ResumeForm";
import ResumeNavbar from "../components/ResumeNavbar";

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
      <ResumeNavbar resumeData={resumeData} handleDownload={handleDownload} />

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row gap-6 px-4 lg:px-8 py-6 lg:py-10">
        {/* Left Form Section */}
        <div className="w-full lg:w-1/2 bg-white p-4 lg:p-6 rounded-lg shadow-md space-y-4 overflow-y-auto max-h-[88vh]">
          <ResumeForm />
          <button
            onClick={handleUpdate}
            className="w-full bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          >
            Update Resume
          </button>
        </div>

        {/* Right Preview Section */}
        <div
          ref={printref}
          className="w-full lg:w-1/2 bg-white p-4 lg:p-6 rounded-lg shadow-md overflow-y-auto max-h-[88vh]"
        >
          <ResumePreview />
        </div>
      </div>
    </div>
  );
};

export default ResumeEditPage;
