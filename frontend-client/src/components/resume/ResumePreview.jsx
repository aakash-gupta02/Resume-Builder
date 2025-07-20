import { useRef } from "react";
import { useResume } from "../../context/ResumeContext";

const ResumePreview = () => {
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
    <div className="w-[794px] mx-auto p-10 bg-white font-sans text-black text-[13px] leading-snug">
      <div ref={printRef}>
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex gap-4">
            {profileImage && (
              <img
                crossOrigin="anonymous"
                src={profileImage}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
            )}
            <div>
              {fullName && <h1 className="text-3xl font-bold">{fullName}</h1>}
              {title && <p className="text-lg text-gray-700">{title}</p>}
              <div className="text-sm mt-2 space-y-1">
                {email && (
                  <p>
                    Email:{" "}
                    <a href={`mailto:${email}`} className="hover:underline">
                      {email}
                    </a>
                  </p>
                )}
                {phone && <p>Phone: {phone}</p>}
                {address && <p>Address: {address}</p>}
              </div>
            </div>
          </div>
          <div className="text-right text-sm space-y-1">
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

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-1 space-y-6">
            {skills.technical?.length > 0 && (
              <div>
                <h2 className="font-semibold text-[15px] border-b pb-1 mb-1">
                  Technical Skills
                </h2>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {skills.technical.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}
            {skills.tools?.length > 0 && (
              <div>
                <h2 className="font-semibold text-[15px] border-b pb-1 mb-1">
                  Tools
                </h2>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {skills.tools.map((tool, i) => (
                    <li key={i}>{tool}</li>
                  ))}
                </ul>
              </div>
            )}
            {skills.soft?.length > 0 && (
              <div>
                <h2 className="font-semibold text-[15px] border-b pb-1 mb-1">
                  Soft Skills
                </h2>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {skills.soft.map((soft, i) => (
                    <li key={i}>{soft}</li>
                  ))}
                </ul>
              </div>
            )}
            {skills.languages?.length > 0 && (
              <div>
                <h2 className="font-semibold text-[15px] border-b pb-1 mb-1">
                  Languages
                </h2>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {skills.languages.map((lang, i) => (
                    <li key={i}>{lang}</li>
                  ))}
                </ul>
              </div>
            )}
            {certifications?.length > 0 &&
              certifications.some((c) => c.name?.trim()) && (
                <div>
                  <h2 className="font-semibold text-[15px] border-b pb-1 mb-1">
                    Certifications
                  </h2>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {certifications.map((cert, idx) => (
                      <li key={idx}>
                        {cert.name} - {cert.issuer}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            {achievements?.length > 0 && (
              <div>
                <h2 className="font-semibold text-[15px] border-b pb-1 mb-1">
                  Achievements
                </h2>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {achievements.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="col-span-2 space-y-6">
            {summary && (
              <div>
                <h2 className="font-semibold text-[15px] border-b pb-1 mb-1">
                  Summary
                </h2>
                <p className="text-sm text-gray-700">{summary}</p>
              </div>
            )}
            {experience?.length > 0 &&
              experience.some((e) => e.company || e.role) && (
                <div>
                  <h2 className="font-semibold text-[15px] border-b pb-1 mb-1">
                    Experience
                  </h2>
                  {experience.map((exp, idx) => (
                    <div key={idx} className="mb-2">
                      <p className="font-semibold text-sm">
                        {exp.role} @ {exp.company}
                      </p>
                      <p className="text-xs text-gray-600">{exp.location}</p>
                      <p className="text-xs italic">
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            {projects?.length > 0 && projects.some((p) => p.name) && (
              <div>
                <h2 className="font-semibold text-[15px] border-b pb-1 mb-1">
                  Projects
                </h2>
                {projects.map((proj, idx) => (
                  <div key={idx} className="mb-2">
                    <p className="font-semibold text-sm">{proj.name}</p>
                    <p className="text-xs italic">
                      {proj.techStack?.join(", ")}
                    </p>
                    <p className="text-sm text-gray-700">{proj.description}</p>
                    <div className="text-xs text-blue-600">
                      {proj.link && (
                        <a
                          href={proj.link}
                          className="hover:underline"
                          target="_blank"
                        >
                          Live
                        </a>
                      )}
                      {proj.github && (
                        <>
                          {" "}
                          |{" "}
                          <a
                            href={proj.github}
                            className="hover:underline"
                            target="_blank"
                          >
                            GitHub
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {education?.length > 0 && education.some((e) => e.institute) && (
              <div>
                <h2 className="font-semibold text-[15px] border-b pb-1 mb-1">
                  Education
                </h2>
                {education.map((edu, idx) => (
                  <div key={idx} className="mb-2">
                    <p className="font-semibold text-sm">
                      {edu.degree} in {edu.fieldOfStudy}
                    </p>
                    <p className="text-xs text-gray-600">{edu.institute}</p>
                    <p className="text-xs italic">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                    {edu.grade && <p className="text-xs">Grade: {edu.grade}</p>}
                    {edu.description && (
                      <p className="text-sm text-gray-700">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
