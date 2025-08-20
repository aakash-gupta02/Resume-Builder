import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useResume } from "../context/ResumeContext";

import ResumePreview from "../components/resume/ResumePreview";
import ResumeForm from "../components/ResumeForm";
import ResumeNavbar from "../components/ResumeNavbar";
import { useRef, useState } from "react";
import API from "../api/axiosInstance";
const CreateResume = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const { token, user } = useAuth();
  const { resumeData, SetResumeData } = useResume();

  const printref = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...resumeData,
        userId: user._id,
      };

      const res = await API.post(
        "/resume/create",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Resume created:", res.data);

      // navigate("/dashboard");
    } catch (error) {
      console.error("Error creating resume:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#f5f4f9]">
        <ResumeNavbar />
        <select
          onChange={(e) => setSelectedTemplate(e.target.value)}
          value={selectedTemplate}
          className="border px-2 py-1 rounded"
        >
          <option value="template1">Template 1</option>
          <option value="template2">Template 2</option>
        </select>

        <div className="flex flex-col lg:flex-row gap-6 px-4 lg:px-8 py-6 lg:py-10">
          <div className="w-full lg:w-1/2 bg-white p-4 lg:p-6 rounded-lg shadow-md space-y-4 overflow-y-auto max-h-[88vh]">
            <ResumeForm />
            <button
              onClick={handleSubmit}
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create Resume
            </button>
          </div>
          <div
            ref={printref}
            className="w-full lg:w-1/2 bg-white p-4 lg:p-6 rounded-lg shadow-md overflow-y-auto max-h-[88vh]"
          >
            {/* <ResumePreview /> */}

    <div className="mt-4">
      {/* <TemplateRenderer selectedTemplate={selectedTemplate} /> */}
    </div>



          </div>
        </div>
      </div>
    </>
  );
};

export default CreateResume;
