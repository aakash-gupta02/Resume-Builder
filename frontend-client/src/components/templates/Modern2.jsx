import { useRef } from "react";
import { useResume } from "../../context/ResumeContext";

const Modern2 = () => {
  const { resumeData } = useResume();
  const printRef = useRef(null);

  const {
    profileInfo = {},
    contactLinks = {},
    education = [],
    experience = [],
    projects = [],
    skills = {},
    certifications = [],
    hobbies = [],
    achievements = [],
    languages = [],
  } = resumeData || {};

  const {
    fullName = "Your Name",
    title = "Your Title",
    email = "",
    phone = "",
    address = "",
    summary = "",
    profileImage = "",
  } = profileInfo;

  const {
    website = "",
    linkedIn = "",
    github = "",
    leetcode = "",
  } = contactLinks;

  // Format date to "Month YYYY"
  const formatDate = (date) => {
    if (!date) return "";
    try {
      const d = new Date(date);
      return d.toLocaleString("default", { month: "long", year: "numeric" });
    } catch {
      return date;
    }
  };

return (
  <div className="max-w-4xl mx-auto bg-white text-sm font-sans text-black leading-snug shadow-md">
    <div ref={printRef} className="flex">
      {/* LEFT SIDEBAR */}
      <div className="w-1/3 bg-gray-100 p-6 text-sm text-black">
        {fullName && <h1 className="text-xl font-bold mb-1">{fullName}</h1>}
        {title && <p className="text-sm italic mb-4">{title}</p>}

        <div className="space-y-2 text-xs">
          {email && <p>📧 {email}</p>}
          {phone && <p>📞 {phone}</p>}
          {address && <p>📍 {address}</p>}
          {linkedIn && <p>🔗 {linkedIn}</p>}
          {website && <p>🌐 {website}</p>}
        </div>

        {/* Profile */}
        {summary && (
          <div className="mt-6">
            <h2 className="font-semibold text-sm mb-1 border-b pb-1">Profile</h2>
            <p className="text-justify text-xs">{summary}</p>
          </div>
        )}

        {/* Education */}
        {education.some((e) => e.institute?.trim()) && (
          <div className="mt-6">
            <h2 className="font-semibold text-sm mb-1 border-b pb-1">Education</h2>
            {education.map((edu, idx) => (
              <div key={idx} className="mb-2">
                <p className="font-semibold text-xs">{edu.degree}</p>
                <p className="text-xs">{edu.institute}</p>
                <p className="text-[10px]">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.some((l) => l.name?.trim()) && (
          <div className="mt-6">
            <h2 className="font-semibold text-sm mb-1 border-b pb-1">Languages</h2>
            {languages.map((lang, idx) => (
              <p key={idx} className="text-xs">{lang.name}</p>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT MAIN CONTENT */}
      <div className="w-2/3 p-6">
        {/* Experience */}
        {experience.some((e) => e.company?.trim()) && (
          <div className="mb-6">
            <h2 className="text-base font-semibold border-b pb-1 mb-2">Professional Experience</h2>
            {experience.map((exp, idx) => (
              <div key={idx} className="mb-3">
                <p className="font-semibold text-sm">
                  {exp.role} {exp.company && `, ${exp.company}`}
                </p>
                <p className="text-xs italic mb-0.5">
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </p>
                {exp.description && <p className="text-xs text-justify">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.some((p) => p.name?.trim()) && (
          <div className="mb-6">
            <h2 className="text-base font-semibold border-b pb-1 mb-2">Projects</h2>
            {projects.map((p, idx) => (
              <div key={idx} className="mb-3">
                <p className="font-semibold text-sm">{p.name}</p>
                {p.description && <p className="text-xs text-justify">{p.description}</p>}
                {p.techStack?.length > 0 && (
                  <p className="text-[10px] mt-0.5 text-gray-700">
                    Tech Used: {p.techStack.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {(skills.technical?.length || skills.soft?.length || skills.tools?.length) > 0 && (
          <div className="mb-6">
            <h2 className="text-base font-semibold border-b pb-1 mb-2">Skills</h2>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {skills.technical?.length > 0 && (
                <div>
                  <strong>Technical:</strong> {skills.technical.join(", ")}
                </div>
              )}
              {skills.soft?.length > 0 && (
                <div>
                  <strong>Soft:</strong> {skills.soft.join(", ")}
                </div>
              )}
              {skills.tools?.length > 0 && (
                <div>
                  <strong>Tools:</strong> {skills.tools.join(", ")}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.some((c) => c.name?.trim()) && (
          <div className="mb-6">
            <h2 className="text-base font-semibold border-b pb-1 mb-2">Certifications</h2>
            {certifications.map((c, idx) => (
              <div key={idx} className="text-xs mb-2">
                <p className="font-semibold">{c.name}</p>
                <p>{c.issuer}</p>
              </div>
            ))}
          </div>
        )}

        {/* Achievements */}
        {achievements.some((a) => a.trim()) && (
          <div className="mb-6">
            <h2 className="text-base font-semibold border-b pb-1 mb-2">Achievements</h2>
            <ul className="list-disc pl-5 text-xs">
              {achievements.map((item, idx) => item && <li key={idx}>{item}</li>)}
            </ul>
          </div>
        )}

        {/* Hobbies */}
        {hobbies.some((h) => h.trim()) && (
          <div className="mb-6">
            <h2 className="text-base font-semibold border-b pb-1 mb-2">Hobbies</h2>
            <p className="text-xs">{hobbies.join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

};

export default Modern2;
