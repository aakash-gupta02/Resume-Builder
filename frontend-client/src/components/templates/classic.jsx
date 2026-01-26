import { useRef } from "react";
import { useResume } from "../../context/ResumeContext";

const Classic = () => {
  const { resume } = useResume();
  const printRef = useRef(null);


  const profileSection = resume.sections.find(
    (sec) => sec.type === "profile"
  );

  const summarySection = resume.sections.find(
    (sec) => sec.type === "summary"
  );

  const skillsSection = resume.sections.find(
    (sec) => sec.type === "skills"
  );

  const projectSectioin = resume.sections.find(
    (sec) => sec.type === "projects"
  );

  const experienceSection = resume.sections.find(
    (sec) => sec.type === "experience"
  );
  const educationSection = resume.sections.find(
    (sec) => sec.type === "education"
  );

  const profile = profileSection?.content || {};
  const summary = summarySection?.content || {};
  const skills = skillsSection?.items || {};
  const projects2 = projectSectioin?.items || {};
  const experience = experienceSection?.items || {};
  const education = educationSection?.items || {};

  const links = profile.links || {};

  console.log(education)

  const {
    certifications = [],
    hobbies = [],
    achievements = [],
    languages = [],
  } = resume || {};

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
        {summary.text && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-1">
              SUMMARY
            </h2>
            <p className="text-justify">{summary.text}</p>
          </div>
        )}

        {/* Education */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
            EDUCATION
          </h2>

          {education.map((item, idx) => {
            const edu = item.values;

            return (
              <div key={idx} className="flex justify-between mb-2">
                <div>
                  <p className="font-semibold">
                    {edu.degree}
                  </p>

                  <p>{edu.institution}</p>

                  {edu.cgpi && (
                    <p className="text-xs">
                      CGPI / GPA: {edu.cgpi}
                    </p>
                  )}
                </div>

                {(edu.startYear || edu.endYear) && (
                  <p className="text-xs whitespace-nowrap">
                    {edu.startYear} – {edu.endYear}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Experience */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
            EXPERIENCE
          </h2>

          {experience.map((item, idx) => {
            const exp = item.values;

            return (
              <div key={idx} className="mb-3">
                {/* ROLE + COMPANY + DATE */}
                <div className="flex justify-between items-start">
                  <p className="font-semibold">
                    {exp.role}
                    {exp.company && ` @ ${exp.company}`}
                    {exp.employmentType && (
                      <span className="text-xs font-normal">
                        {" "}({exp.employmentType})
                      </span>
                    )}
                  </p>

                  <p className="text-xs whitespace-nowrap">
                    {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                  </p>
                </div>

                {/* LOCATION */}
                {exp.location && (
                  <p className="text-xs text-gray-600">
                    {exp.location}
                  </p>
                )}

                {/* RESPONSIBILITIES / ACHIEVEMENTS */}
                {Array.isArray(exp.responsibilities) &&
                  exp.responsibilities.length > 0 && (
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      {exp.responsibilities.map((point, i) => (
                        <li key={i} className="text-sm text-justify">
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            );
          })}
        </div>

        {/* Projects */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-1">
            PROJECTS
          </h2>
          {projects2.map((item, idx) => {
            const project = item.values || {};
            return (
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

                {/* Tech Stack */}
                {project.techStack?.length > 0 && (
                  <p className="text-xs mt-0.5">
                    Tech: {project.techStack.join(", ")}
                  </p>
                )}

                {/* Description */}
                {project.description && (
                  <p className="text-justify">{project.description}</p>
                )}

                {/* Highlights */}
                {Array.isArray(project.highlights) && project.highlights.length > 0 && (
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    {project.highlights.map((point, idx) => (
                      <li key={idx} className="text-sm text-justify">
                        {point}
                      </li>
                    ))}
                  </ul>
                )}


              </div>
            );
          })}
        </div>

        {/* skills */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
            SKILLS
          </h2>

          <div className="grid grid-cols-2 gap-2">
            {skills.map((item, index) => {
              const { category, skills } = item.values || {};
              if (!skills?.length) return null;

              return (
                <div key={index}>
                  <strong>{category}:</strong>
                  <p className="text-xs">{skills.join(", ")}</p>
                </div>
              );
            })}
          </div>
        </div>

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
