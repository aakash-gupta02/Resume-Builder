import { useRef } from "react";
import { useResume } from "../../context/ResumeContext";

const Classic2 = () => {
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
    <div className="max-w-4xl mx-auto p-8 bg-slate-50 font-serif text-gray-800">
      {/* Header */}
      <header className="text-center mb-10">
        {profileImage && (
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-slate-200 shadow-lg"
            crossOrigin="anonymous"
          />
        )}
        {fullName && <h1 className="text-4xl font-bold text-slate-800 tracking-wider">{fullName}</h1>}
        {title && <p className="text-xl text-slate-600 mt-1">{title}</p>}
        <div className="flex justify-center gap-x-6 mt-4 text-sm text-slate-500">
          {email && <span>{email}</span>}
          {phone && <span>{phone}</span>}
          {address && <span>{address}</span>}
        </div>
        <div className="flex justify-center gap-x-6 mt-2 text-sm">
          {website && <a href={website} className="text-blue-600 hover:underline">Website</a>}
          {linkedIn && <a href={linkedIn} className="text-blue-600 hover:underline">LinkedIn</a>}
          {github && <a href={github} className="text-blue-600 hover:underline">GitHub</a>}
        </div>
      </header>

      <main className="grid grid-cols-12 gap-10">
        <div className="col-span-8">
          {/* Summary */}
          {summary && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-700 border-b-2 border-slate-200 pb-2 mb-4">
                Profile
              </h2>
              <p className="text-justify">{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience?.some(exp => exp.company || exp.role) && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-700 border-b-2 border-slate-200 pb-2 mb-4">
                Work Experience
              </h2>
              {experience.map((exp, idx) => (
                <div key={idx} className="mb-6 relative pl-6">
                  <div className="absolute left-0 top-1.5 w-3 h-3 bg-slate-300 rounded-full border-2 border-white"></div>
                  <div className="absolute left-[5px] top-4 h-full border-l-2 border-slate-200"></div>
                  <p className="font-bold text-lg">{exp.role}</p>
                  <div className="flex justify-between items-baseline">
                    <p className="text-md text-slate-600">{exp.company}</p>
                    <p className="text-xs text-slate-500">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </p>
                  </div>
                  {exp.location && <p className="text-xs text-slate-500 mb-2">{exp.location}</p>}
                  <p className="text-sm text-justify">{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects?.some(p => p.name) && (
            <section>
              <h2 className="text-2xl font-semibold text-slate-700 border-b-2 border-slate-200 pb-2 mb-4">
                Projects
              </h2>
              {projects.map((project, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-lg">{project.name}</p>
                    <div className="flex gap-4 text-sm">
                      {project.link && <a href={project.link} className="text-blue-600 hover:underline">Live Demo</a>}
                      {project.github && <a href={project.github} className="text-blue-600 hover:underline">Source Code</a>}
                    </div>
                  </div>
                  {project.techStack?.length > 0 && <p className="text-xs text-slate-500 italic mb-1">Tech Stack: {project.techStack.join(', ')}</p>}
                  <p className="text-sm text-justify">{project.description}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        <aside className="col-span-4">
          {/* Education */}
          {education?.some(e => e.institute) && (
            <section className="mb-6">
              <h3 className="text-xl font-semibold text-slate-700 mb-3">Education</h3>
              {education.map((edu, idx) => (
                <div key={idx} className="mb-3">
                  <p className="font-bold">{edu.degree} in {edu.fieldOfStudy}</p>
                  <p className="text-sm text-slate-600">{edu.institute}</p>
                  <p className="text-xs text-slate-500">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                  {edu.grade && <p className="text-xs text-slate-500">Grade: {edu.grade}</p>}
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skills && (Object.values(skills).some(s => s?.length > 0)) && (
            <section className="mb-6">
              <h3 className="text-xl font-semibold text-slate-700 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {[...(skills.technical || []), ...(skills.soft || []), ...(skills.tools || [])].map((skill, idx) => (
                  <span key={idx} className="bg-slate-200 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications?.some(c => c.name) && (
            <section className="mb-6">
              <h3 className="text-xl font-semibold text-slate-700 mb-3">Certifications</h3>
              {certifications.map((cert, idx) => (
                <div key={idx} className="mb-2">
                  <a href={cert.credentialUrl} className="font-semibold text-blue-600 hover:underline">{cert.name}</a>
                  <p className="text-xs text-slate-500">{cert.issuer} • {formatDate(cert.date)}</p>
                </div>
              ))}
            </section>
          )}

          {/* Achievements */}
          {achievements?.some(a => a) && (
            <section className="mb-6">
              <h3 className="text-xl font-semibold text-slate-700 mb-3">Achievements</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {achievements.map((item, idx) => item && <li key={idx}>{item}</li>)}
              </ul>
            </section>
          )}

          {/* Languages */}
          {languages?.some(lang => lang.name) && (
            <section className="mb-6">
              <h3 className="text-xl font-semibold text-slate-700 mb-3">Languages</h3>
              {languages.map((lang, idx) => (
                <div key={idx} className="mb-1">
                  <div className="flex justify-between text-sm mb-0.5">
                    <span>{lang.name}</span>
                    <span className="text-slate-500">{lang.progress || 0}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div className="bg-slate-500 h-1.5 rounded-full" style={{ width: `${lang.progress || 0}%` }}></div>
                  </div>
                </div>
              ))}
            </section>
          )}
        </aside>
      </main>
    </div>
  );
};

export default Classic2;
