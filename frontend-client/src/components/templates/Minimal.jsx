import { useRef } from "react";
import { useResume } from "../../context/ResumeContext";

const Minimal = () => {
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
    <div className="max-w-2xl mx-auto p-8 bg-white font-sans text-gray-800">
      <div ref={printRef} className="space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          {profileImage && (
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-gray-200"
            />
          )}
          {fullName && <h1 className="text-3xl font-light tracking-wide">{fullName}</h1>}
          {title && <p className="text-gray-500 mt-2">{title}</p>}
          
          <div className="flex flex-wrap justify-center gap-x-4 mt-4 text-sm">
            {email && <span className="flex items-center">{email}</span>}
            {phone && <span className="flex items-center">{phone}</span>}
            {address && <span className="flex items-center">{address}</span>}
          </div>
          
          <div className="flex justify-center gap-4 mt-3">
            {website && <a href={website} className="text-gray-600 hover:text-gray-900">Website</a>}
            {linkedIn && <a href={linkedIn} className="text-gray-600 hover:text-gray-900">LinkedIn</a>}
            {github && <a href={github} className="text-gray-600 hover:text-gray-900">GitHub</a>}
            {leetcode && <a href={leetcode} className="text-gray-600 hover:text-gray-900">LeetCode</a>}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Summary */}
        {summary && (
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-gray-700">PROFILE</h2>
            <p className="text-gray-600 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.some(exp => exp.company?.trim() || exp.role?.trim()) && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-700">EXPERIENCE</h2>
            {experience.map((exp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{exp.role} • {exp.company}</h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.location && <p className="text-sm text-gray-500">{exp.location}</p>}
                {exp.description && (
                  <p className="text-gray-600 text-sm mt-1">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.some(e => e.institute?.trim()) && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-700">EDUCATION</h2>
            {education.map((edu, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{edu.degree}</h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
                <p className="text-gray-600">{edu.institute}</p>
                {edu.fieldOfStudy && <p className="text-sm text-gray-500">{edu.fieldOfStudy}</p>}
                {edu.grade && <p className="text-sm text-gray-500">Grade: {edu.grade}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.some(p => p.name?.trim()) && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-700">PROJECTS</h2>
            {projects.map((project, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{project.name}</h3>
                  <div className="flex gap-2 text-sm">
                    {project.link && <a href={project.link} className="text-gray-600 hover:text-gray-900">Live</a>}
                    {project.github && <a href={project.github} className="text-gray-600 hover:text-gray-900">Code</a>}
                  </div>
                </div>
                {project.description && (
                  <p className="text-gray-600 text-sm">{project.description}</p>
                )}
                {project.techStack?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-600">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {(skills.technical?.length || skills.soft?.length || skills.tools?.length || skills.languages?.length) > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-700">SKILLS</h2>
            <div className="grid grid-cols-2 gap-4">
              {skills.technical?.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Technical</h3>
                  <p className="text-sm text-gray-500">{skills.technical.join(", ")}</p>
                </div>
              )}
              {skills.tools?.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Tools</h3>
                  <p className="text-sm text-gray-500">{skills.tools.join(", ")}</p>
                </div>
              )}
              {skills.soft?.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Soft Skills</h3>
                  <p className="text-sm text-gray-500">{skills.soft.join(", ")}</p>
                </div>
              )}
              {skills.languages?.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Languages</h3>
                  <p className="text-sm text-gray-500">{skills.languages.join(", ")}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.some(c => c.name?.trim()) && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-700">CERTIFICATIONS</h2>
            {certifications.map((cert, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{cert.name}</h3>
                  <span className="text-sm text-gray-500">{formatDate(cert.date)}</span>
                </div>
                <p className="text-sm text-gray-600">{cert.issuer}</p>
                {cert.credentialUrl && (
                  <a href={cert.credentialUrl} className="text-xs text-gray-500 hover:text-gray-700">
                    View Credential
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Footer with additional info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          {achievements.some(a => a.trim()) && (
            <div>
              <h3 className="font-medium text-gray-700">ACHIEVEMENTS</h3>
              <ul className="list-disc pl-5 space-y-1 mt-1 text-gray-600">
                {achievements.map((item, idx) => item && <li key={idx}>{item}</li>)}
              </ul>
            </div>
          )}
          
          {hobbies.some(h => h.trim()) && (
            <div>
              <h3 className="font-medium text-gray-700">INTERESTS</h3>
              <p className="text-gray-600 mt-1">{hobbies.join(", ")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Minimal;
