import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import { useResume } from "../context/ResumeContext";


import ProfileSection from "../components/resume/ProfileSection";
// import SkillsSection from "../components/resume/SkillsSection";
import ResumePreview from "../components/resume/ResumePreview";

const CreateResume = () => {

const navigate = useNavigate();
const { token, user } = useAuth();
const { resumeData, SetResumeData } = useResume();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      ...resumeData,
      userId: user._id,
    };

    const res = await axios.post("http://localhost:3000/api/resumes", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Resume created:", res.data);

    // Optionally redirect
    // navigate("/dashboard");
  } catch (error) {
    console.error("Error creating resume:", error);
  }
};

  return (
    <div className="flex gap-6 px-8 py-6">

        
      {/* Left: Form Sections */}
      <div className="w-[40%] space-y-4 overflow-y-auto h-[90vh] pr-4">
        <ProfileSection />
        {/* <SkillsSection /> */}


        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Resume
        </button>




      </div>

      {/* Right: Live Preview */}
      <div className="w-[60%] bg-white p-6 rounded shadow overflow-y-auto h-[90vh]">
        <ResumePreview />
      </div>




    </div>
  );
};

export default CreateResume;
