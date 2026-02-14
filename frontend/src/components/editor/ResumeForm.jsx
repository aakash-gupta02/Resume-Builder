"use client";

import { useResume } from "@/context/ResumeContext";
import ProfileSection from "./sections/ProfileSection";
import SummarySection from "./sections/SummarySection";
import ExperienceSection from "./sections/ExperienceSection";
import EducationSection from "./sections/EducationSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import CertificationsSection from "./sections/CertificationsSection";
import LanguagesSection from "./sections/LanguagesSection";
import AchievementsSection from "./sections/AchievementsSection";

export default function ResumeForm() {
  const { getVisibleSections } = useResume();

  const sectionComponents = {
    profile: ProfileSection,
    summary: SummarySection,
    experience: ExperienceSection,
    education: EducationSection,
    skills: SkillsSection,
    projects: ProjectsSection,
    certifications: CertificationsSection,
    languages: LanguagesSection,
    achievements: AchievementsSection,
    hobbies: AchievementsSection, // Reuse achievements for hobbies
  };

  const visibleSections = getVisibleSections();

  if (!visibleSections || visibleSections.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No sections available. Please check settings.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {visibleSections.map((section) => {
        const SectionComponent = sectionComponents[section.type];
        if (!SectionComponent) return null;

        return <SectionComponent key={section.id || section.type} section={section} />;
      })}
    </div>
  );
}
