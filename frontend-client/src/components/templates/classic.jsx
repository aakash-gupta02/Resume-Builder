import { useRef } from "react";
import { useResume } from "../../context/ResumeContext";

const Classic = () => {
  const { resume } = useResume();
  const printRef = useRef(null);


  const profileSection = resume.sections.find(
    (sec) => sec.type === "profile"
  );

  const profile = profileSection?.content || {};
  const links = profile.links || {};
  console.log("Profile: ", profile);
  

  const {
    profileInfo = {},
    education = [],
    experience = [],
    projects = [],
    skills = {},
    certifications = [],
    hobbies = [],
    achievements = [],
    languages = [],
  } = resume || {};

  const {
    summary = "",
  } = profileInfo;

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
    <div className="max-w-3xl mx-auto p-6 bg-white font-sans text-black text-sm leading-snug">
      <div ref={printRef} className="p-4">
        {/* Profile */}
        <div className="flex justify-between items-start mb-4 border-b pb-4">
          <div className="flex items-start gap-4">
            {profile.profileImage && (
              <img
                crossOrigin="anonymous"
                src={profile.profileImage}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border"
              />
            )}
            <div>
              {profile.fullName && <h1 className="text-2xl font-bold">{profile.fullName}</h1>}
              {profile.jobTitle && <p className="text-base text-gray-700">{profile.jobTitle}</p>}
              <div className="flex flex-wrap gap-x-2 mt-1 text-xs">
                {profile.email && <span>{profile.email}</span>}
                {profile.phone && <span>• {profile.phone}</span>}
                {profile.location && <span>• {profile.location}</span>}
              </div>
            </div>
          </div>

          <div className="text-right space-y-0.5 text-xs">
            {links.website && (
              <div>
                <a href={links.website} className="text-black hover:underline">
                  Website
                </a>
              </div>
            )}
            {links.linkedin && (
              <div>
                <a href={links.linkedin} className="text-black hover:underline">
                  LinkedIn
                </a>
              </div>
            )}
            {links.github && (
              <div>
                <a href={links.github} className="text-black hover:underline">
                  GitHub
                </a>
              </div>
            )}
            {links.leetcode && (
              <div>
                <a href={links.leetcode} className="text-black hover:underline">
                  LeetCode
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-1">
              SUMMARY
            </h2>
            <p className="text-justify">{summary}</p>
          </div>
        )}

        {/* Education */}
        {education.some((e) => e.institute?.trim()) && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-1">
              EDUCATION
            </h2>
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between mb-2">
                <div>
                  <p className="font-semibold">
                    {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                  </p>
                  <p>{edu.institute}</p>
                  {edu.grade && <p className="text-xs">Grade: {edu.grade}</p>}
                </div>
                <p className="text-xs whitespace-nowrap">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {experience.some((exp) => exp.company?.trim() || exp.role?.trim()) && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-1">
              EXPERIENCE
            </h2>
            {experience.map((exp, idx) => (
              <div key={idx} className="mb-3">
                <div className="flex justify-between">
                  <p className="font-semibold">
                    {exp.role} {exp.company && `@ ${exp.company}`}
                  </p>
                  <p className="text-xs whitespace-nowrap">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </p>
                </div>
                {exp.location && <p className="text-xs">{exp.location}</p>}
                {exp.description && (
                  <p className="mt-1 text-justify">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.some((p) => p.name?.trim()) && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-1">
              PROJECTS
            </h2>
            {projects.map((project, idx) => (
              <div key={idx} className="mb-2">
                <div className="flex justify-between">
                  <p className="font-semibold">{project.name}</p>
                  <div className="flex gap-2 text-xs">
                    {project.link && (
                      <a
                        href={project.link}
                        className="text-black hover:underline"
                      >
                        Live
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        className="text-black hover:underline"
                      >
                        Code
                      </a>
                    )}
                  </div>
                </div>
                {project.description && (
                  <p className="text-justify">{project.description}</p>
                )}
                {project.techStack?.length > 0 && (
                  <p className="text-xs mt-0.5">
                    Tech: {project.techStack.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {(skills.technical?.length ||
          skills.soft?.length ||
          skills.tools?.length ||
          skills.languages?.length) > 0 && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-1">
                SKILLS
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {skills.technical?.length > 0 && (
                  <div>
                    <strong>Technical:</strong>
                    <p className="text-xs">{skills.technical.join(", ")}</p>
                  </div>
                )}
                {skills.soft?.length > 0 && (
                  <div>
                    <strong>Soft Skills:</strong>
                    <p className="text-xs">{skills.soft.join(", ")}</p>
                  </div>
                )}
                {skills.tools?.length > 0 && (
                  <div>
                    <strong>Tools:</strong>
                    <p className="text-xs">{skills.tools.join(", ")}</p>
                  </div>
                )}
                {skills.languages?.length > 0 && (
                  <div>
                    <strong>Languages:</strong>
                    <p className="text-xs">{skills.languages.join(", ")}</p>
                  </div>
                )}
              </div>
            </div>
          )}

        {/* Certifications */}
        {certifications.some((c) => c.name?.trim()) && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-1">
              CERTIFICATIONS
            </h2>
            {certifications.map((cert, idx) => (
              <div key={idx} className="flex justify-between mb-1">
                <div>
                  <p className="font-semibold">{cert.name}</p>
                  <p className="text-xs">{cert.issuer}</p>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      className="text-xs text-black hover:underline"
                    >
                      View Credential
                    </a>
                  )}
                </div>
                <p className="text-xs whitespace-nowrap">
                  {formatDate(cert.date)}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Achievements */}
        {achievements.some((a) => a.trim()) && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-1">
              ACHIEVEMENTS
            </h2>
            <ul className="list-disc pl-5">
              {achievements.map(
                (item, idx) =>
                  item && (
                    <li key={idx} className="text-xs">
                      {item}
                    </li>
                  )
              )}
            </ul>
          </div>
        )}

        {/* Languages */}
        {languages.some((lang) => lang.name?.trim()) && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-1">
              LANGUAGES
            </h2>
            <div className="flex flex-wrap gap-x-4">
              {languages
                .filter((lang) => lang.name?.trim())
                .map((lang, idx) => (
                  <div key={idx} className="text-xs">
                    {lang.name} ({lang.progress || 0}%)
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Hobbies */}
        {hobbies.some((h) => h.trim()) && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-1">
              HOBBIES
            </h2>
            <div className="flex flex-wrap gap-x-2 text-xs">
              {hobbies.map(
                (item, idx) => item && <span key={idx}>{item}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Classic;
