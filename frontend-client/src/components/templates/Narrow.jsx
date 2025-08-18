import { useRef } from "react";
import { useResume } from "../../context/ResumeContext";

const Narrow = () => {
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
    <div
      ref={printRef}
      className="max-w-5xl mx-auto bg-white font-sans text-black text-sm leading-snug border shadow-lg"
    >
      <div className="grid grid-cols-3">
        {/* LEFT SIDEBAR */}
        <div className="col-span-1 bg-gray-100 p-4 space-y-4">
          {/* Profile Image */}
          {profileImage && (
            <div className="flex justify-center">
              <img
                crossOrigin="anonymous"
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border"
              />
            </div>
          )}

          {/* Contact Info */}
          <div>
            <h2 className="text-base font-bold border-b pb-1 mb-2">CONTACT</h2>
            <div className="space-y-1 text-xs">
              {email && <p>{email}</p>}
              {phone && <p>{phone}</p>}
              {address && <p>{address}</p>}
              {website && (
                <p>
                  <a href={website} className="hover:underline">
                    Website
                  </a>
                </p>
              )}
              {linkedIn && (
                <p>
                  <a href={linkedIn} className="hover:underline">
                    LinkedIn
                  </a>
                </p>
              )}
              {github && (
                <p>
                  <a href={github} className="hover:underline">
                    GitHub
                  </a>
                </p>
              )}
              {leetcode && (
                <p>
                  <a href={leetcode} className="hover:underline">
                    LeetCode
                  </a>
                </p>
              )}
            </div>
          </div>

          {/* Skills */}
          {(skills.technical?.length ||
            skills.soft?.length ||
            skills.tools?.length ||
            skills.languages?.length) > 0 && (
            <div>
              <h2 className="text-base font-bold border-b pb-1 mb-2">SKILLS</h2>
              <div className="space-y-2 text-xs">
                {skills.technical?.length > 0 && (
                  <div>
                    <p className="font-semibold">Technical</p>
                    <p>{skills.technical.join(", ")}</p>
                  </div>
                )}
                {skills.tools?.length > 0 && (
                  <div>
                    <p className="font-semibold">Tools</p>
                    <p>{skills.tools.join(", ")}</p>
                  </div>
                )}
                {skills.languages?.length > 0 && (
                  <div>
                    <p className="font-semibold">Languages</p>
                    <p>{skills.languages.join(", ")}</p>
                  </div>
                )}
                {skills.soft?.length > 0 && (
                  <div>
                    <p className="font-semibold">Soft Skills</p>
                    <p>{skills.soft.join(", ")}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.some((c) => c.name?.trim()) && (
            <div>
              <h2 className="text-base font-bold border-b pb-1 mb-2">
                CERTIFICATIONS
              </h2>
              <div className="space-y-2 text-xs">
                {certifications.map((cert, idx) => (
                  <div key={idx}>
                    <p className="font-semibold">{cert.name}</p>
                    <p>{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.some((lang) => lang.name?.trim()) && (
            <div>
              <h2 className="text-base font-bold border-b pb-1 mb-2">
                LANGUAGES
              </h2>
              <div className="flex flex-wrap gap-2 text-xs">
                {languages.map(
                  (lang, idx) =>
                    lang.name && (
                      <span key={idx}>
                        {lang.name} ({lang.progress || 0}%)
                      </span>
                    )
                )}
              </div>
            </div>
          )}

          {/* Hobbies */}
          {hobbies.some((h) => h.trim()) && (
            <div>
              <h2 className="text-base font-bold border-b pb-1 mb-2">
                HOBBIES
              </h2>
              <div className="flex flex-wrap gap-2 text-xs">
                {hobbies.map(
                  (item, idx) => item && <span key={idx}>{item}</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* MAIN CONTENT */}
        <div className="col-span-2 p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">{fullName}</h1>
            <p className="text-lg text-gray-700">{title}</p>
          </div>

          {/* Summary */}
          {summary && (
            <div>
              <h2 className="text-base font-bold border-b pb-1 mb-2">SUMMARY</h2>
              <p className="text-justify">{summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.some((exp) => exp.company?.trim() || exp.role?.trim()) && (
            <div>
              <h2 className="text-base font-bold border-b pb-1 mb-2">
                EXPERIENCE
              </h2>
              <div className="space-y-3">
                {experience.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm">
                      <p className="font-semibold">
                        {exp.role} {exp.company && `@ ${exp.company}`}
                      </p>
                      <p className="text-xs whitespace-nowrap">
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </p>
                    </div>
                    {exp.location && (
                      <p className="text-xs text-gray-600">{exp.location}</p>
                    )}
                    {exp.description && (
                      <p className="text-justify text-xs mt-1">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.some((p) => p.name?.trim()) && (
            <div>
              <h2 className="text-base font-bold border-b pb-1 mb-2">
                PROJECTS
              </h2>
              <div className="space-y-2">
                {projects.map((project, idx) => (
                  <div key={idx}>
                    <p className="font-semibold">{project.name}</p>
                    {project.description && (
                      <p className="text-xs text-justify">
                        {project.description}
                      </p>
                    )}
                    {project.techStack?.length > 0 && (
                      <p className="text-xs text-gray-600">
                        Tech: {project.techStack.join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.some((e) => e.institute?.trim()) && (
            <div>
              <h2 className="text-base font-bold border-b pb-1 mb-2">
                EDUCATION
              </h2>
              <div className="space-y-2">
                {education.map((edu, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <div>
                      <p className="font-semibold">
                        {edu.degree}{" "}
                        {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                      </p>
                      <p>{edu.institute}</p>
                      {edu.grade && (
                        <p className="text-xs text-gray-600">Grade: {edu.grade}</p>
                      )}
                    </div>
                    <p className="text-xs whitespace-nowrap">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {achievements.some((a) => a.trim()) && (
            <div>
              <h2 className="text-base font-bold border-b pb-1 mb-2">
                ACHIEVEMENTS
              </h2>
              <ul className="list-disc pl-5 text-xs space-y-1">
                {achievements.map(
                  (item, idx) => item && <li key={idx}>{item}</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Narrow;
