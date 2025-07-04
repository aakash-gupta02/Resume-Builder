import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import CreateResume from "./CreateResume";
import { useResume } from "../context/ResumeContext";
import { useAuth } from "../context/AuthContext";

import SkillsSection from "../components/resume/SkillsSection";
import ResumePreview from "../components/resume/ResumePreview";
import ProfileInfoSection from "../components/resume/ProfileInfoSection";
import ContactLinksSection from "../components/resume/ContactLinkSection";
import EducationSection from "../components/resume/EducationSection";
import ExperienceSection from "../components/resume/ExperienceSection";
import CertificationsSection from "../components/resume/CertificationsSection";
import AchievementsSection from "../components/resume/AchievementsSection";
import LanguagesSection from "../components/resume/LanguagesSection";
import HobbiesSection from "../components/resume/HobbiesSection";
import ProjectsSection from "../components/resume/ProjectsSection";

const ResumeEditPage = () => {
  const { id } = useParams();
  const { setResumeData, resumeData } = useResume();
  const { token } = useAuth();


  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/resume/get/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setResumeData(res.data.resume);

        console.log("response data: ", res.data );
        

        console.log(resumeData);
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
      console.log(res.data);
    } catch (error) {
      console.error("Error loading resume:", error);
    }
  };


  const handleDownload = () =>{
    window.print()
  }

  return (
    <div className="flex gap-6 px-8 py-6">
      
      {/* Left: Form Sections */}
      <div className="w-[40%] space-y-4 overflow-y-auto h-[90vh] pr-4">


        <button
          onClick={handleDownload}
          className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download
        </button>


        <ProfileInfoSection />
        <ContactLinksSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <CertificationsSection />
        <AchievementsSection />
        <LanguagesSection />
        <HobbiesSection />

        <button
          onClick={handleUpdate}
          className="mt-6 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
        >
          Update Resume
        </button>
      </div>

      {/* Right: Live Preview */}
      <div className="w-[60%] bg-white p-6 rounded shadow overflow-y-auto h-[90vh]">
        <ResumePreview />
      </div>
    </div>
  );
};

export default ResumeEditPage;
