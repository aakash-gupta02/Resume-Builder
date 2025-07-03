import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import html2pdf from "html2pdf.js";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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

  const printref = useRef(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/resume/get/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

const handleDownload = async () => {
  const element = printref.current;

  if (!element) {
    console.error("Element not found for PDF generation.");
    return;
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    scrollX: 0,
    scrollY: -window.scrollY,
    windowWidth: document.documentElement.scrollWidth,
    windowHeight: element.scrollHeight,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  let heightLeft = pdfHeight;
  let position = 0;

  // First page
  pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
  heightLeft -= pdf.internal.pageSize.getHeight();

  // Add additional pages if content overflows
  while (heightLeft > 0) {
    position = heightLeft - pdfHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();
  }

  pdf.save("resume.pdf");
};




  return (
    <div className="flex gap-6 px-8 py-6">
      {/* Left: Form Sections */}
      <div className="w-[40%] space-y-4 overflow-y-auto h-[90vh] pr-4">
        <button
          onClick={handleDownload}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 "
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
      <div
        ref={printref}
        className="w-[60%] bg-white p-6 rounded shadow overflow-y-auto h-[90vh]"
      >
        <ResumePreview   />
      </div>
    </div>
  );
};

export default ResumeEditPage;
