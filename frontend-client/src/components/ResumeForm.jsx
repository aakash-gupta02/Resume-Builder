import React from "react";
import ProfileInfoSection from "./resume/ProfileInfoSection";
import ContactLinksSection from "./resume/ContactLinkSection";
import SkillsSection from "./resume/SkillsSection";
import ProjectsSection from "./resume/ProjectsSection";
import ExperienceSection from "./resume/ExperienceSection";
import EducationSection from "./resume/EducationSection";
import CertificationsSection from "./resume/CertificationsSection";
import AchievementsSection from "./resume/AchievementsSection";
import LanguagesSection from "./resume/LanguagesSection";
import HobbiesSection from "./resume/HobbiesSection";
import SummarySection from "./resume/SummarySection";


const ResumeForm = () => {
  return (
    <>
      <ProfileInfoSection />
      <SummarySection />
      {/* <ContactLinksSection /> */}
      <SkillsSection />
      <ProjectsSection />
      {/* <ExperienceSection />
      <EducationSection />
      <CertificationsSection />
      <AchievementsSection />
      <LanguagesSection />
      <HobbiesSection /> */}
    </>
  );
};

export default ResumeForm;
