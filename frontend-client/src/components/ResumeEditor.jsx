import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useResume } from "../context/ResumeContext";
import { useAuth } from "../context/AuthContext";

import ResumeForm from "../components/ResumeForm";
import ResumeNavbar from "../components/ResumeNavbar";
import TemplateRenderer from "./TemplateRenderer";
import API from "../api/axiosInstance";
import BackgroundComponent from "./BackgroundComponent";
import { toast } from "react-toastify";

const ResumeEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const { resume, setResume } = useResume();

  const printref = useRef(null);
  const [loading, setLoading] = useState(true);

  const isEditMode = Boolean(id);

  // edit mode & fetch resume data 
  useEffect(() => {
    const fetchResume = async () => {
      if (!isEditMode) return setLoading(false);

      try {
        const res = await API.get(`/resume/get/${id}`);

        setResume(res.data.resume);
        toast.success("Resume data loaded successfully!");
      } catch (err) {
        console.error("Error loading resume:", err);
        toast.error("Failed to load resume data.");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();

    return () => {
      setResume({});
    };
  }, [id, isEditMode, setResume]);

  const handleSubmit = async () => {
    const payload = {
      ...resume,
      userId: user._id,
    };

    try {
      if (isEditMode) {
        await API.patch(`/resume/update/${id}`, payload);

        console.log("Resume updated!");
        toast.success("Resume updated successfully!");
      } else {
        const res = await API.post("/resume/create", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Resume created!");
        toast.success("Resume created successfully!");
        navigate(`/resume/edit/${res.data.resume._id}`);
      }
    } catch (error) {
      console.error("Error submitting resume:", error);
      toast.error("Failed to submit resume.");
    }
  };

  const handleDownload = () => {
    navigate(`/resume/preview/${id}`);
  };

  // console.log(resume);
  

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <BackgroundComponent>
      <div className="min-h-screen bg-white/30 ">
        {id && isEditMode ? (
          <ResumeNavbar
            resume={resume}
            handleDownload={handleDownload}
          />
        ) : (
          <ResumeNavbar />
        )}

        <div className="flex flex-col lg:flex-row gap-6 px-4 lg:px-8 py-6 lg:py-10">
          {/* Left Form */}
          <div className="w-full lg:w-1/2 bg-white p-4 lg:p-6 rounded-lg shadow-md space-y-4 overflow-y-auto max-h-[88vh]">
            <ResumeForm />
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {isEditMode ? "Update Resume" : "Create Resume"}
            </button>
          </div>

          {/* Right Preview */}
          <div
            ref={printref}
            className="w-full lg:w-1/2 bg-white p-4 lg:p-6 rounded-lg shadow-md overflow-y-auto max-h-[88vh]"
          >
            {/* <ResumePreview /> */}
            {/* <Classic /> */}
            {/* 
          <div className="mt-4">
            <TemplateRenderer />
          </div> */}

            <TemplateRenderer />
          </div>
        </div>
      </div>
    </BackgroundComponent>
  );
};

export default ResumeEditor;
