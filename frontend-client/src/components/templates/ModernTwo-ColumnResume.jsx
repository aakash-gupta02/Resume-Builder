import { useRef } from "react";
import { useResume } from "../../context/ResumeContext";
import Modern from "./Modern";

const ModernTwoColumnResume = () => {
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
    {/* TOP HEADER */}
    <div className="px-8 pt-8 pb-4">
      <h1 className="text-3xl font-bold tracking-wide uppercase">{fullName}</h1>
      {title && (
        <p className="text-base text-sky-700 font-semibold mt-1">
          {title}
        </p>
      )}
      <div className="mt-2 text-xs text-gray-700 flex flex-wrap gap-x-4 gap-y-1">
        {phone && <span>{phone}</span>}
        {email && <span>{email}</span>}
        {linkedIn && (
          <span>
            <a href={linkedIn} className="hover:underline">linkedin.com</a>
          </span>
        )}
        {address && <span>{address}</span>}
      </div>
    </div>

    {/* BODY GRID */}
    <div className="grid grid-cols-3 gap-6 px-8 pb-8">
      {/* LEFT SIDEBAR */}
      <div className="col-span-1 space-y-6">
        {/* SUMMARY (left-aligned section per design) */}
        {summary && (
          <div>
            <h2 className="text-base font-bold border-b pb-1 mb-2">SUMMARY</h2>
            <p className="text-justify">{summary}</p>
          </div>
        )}

        {/* PROJECTS */}
        {projects?.some((p) => p?.name?.trim()) && (
          <div>
            <h2 className="text-base font-bold border-b pb-1 mb-2">PROJECTS</h2>
            <div className="space-y-3">
              {projects.map((project, idx) =>
                project?.name?.trim() ? (
                  <div key={idx}>
                    <p className="font-semibold">{project.name}</p>
                    {project.description && (
                      <p className="text-xs text-justify">{project.description}</p>
                    )}
                    {project.techStack?.length > 0 && (
                      <p className="text-xs text-gray-600">
                        Tech: {project.techStack.join(", ")}
                      </p>
                    )}
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}

        {/* KEY ACHIEVEMENTS */}
        {achievements?.some((a) => a?.trim && a.trim()) && (
          <div>
            <h2 className="text-base font-bold border-b pb-1 mb-2">KEY ACHIEVEMENTS</h2>
            <ul className="list-disc pl-5 text-xs space-y-1">
              {achievements.map((item, idx) => (item ? <li key={idx}>{item}</li> : null))}
            </ul>
          </div>
        )}

      </div>

      {/* MAIN CONTENT */}
      <div className="col-span-2 space-y-6">
        {/* EXPERIENCE */}
        {experience?.some((exp) => exp?.company?.trim() || exp?.role?.trim()) && (
          <div>
            <h2 className="text-base font-bold border-b pb-1 mb-2">EXPERIENCE</h2>
            <div className="space-y-4">
              {experience.map((exp, idx) =>
                exp?.company?.trim() || exp?.role?.trim() ? (
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
                    {Array.isArray(exp.description) ? (
                      <ul className="list-disc pl-5 mt-1 text-xs space-y-1">
                        {exp.description.map((point, i) =>
                          point ? <li key={i}>{point}</li> : null
                        )}
                      </ul>
                    ) : exp.description ? (
                      <p className="text-justify text-xs mt-1">{exp.description}</p>
                    ) : null}
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}

        {/* SKILLS */}
        {(skills?.technical?.length ||
          skills?.soft?.length ||
          skills?.tools?.length ||
          skills?.languages?.length) > 0 && (
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

        {/* EDUCATION */}
        {education?.some((e) => e?.institute?.trim()) && (
          <div>
            <h2 className="text-base font-bold border-b pb-1 mb-2">EDUCATION</h2>
            <div className="space-y-2">
              {education.map((edu, idx) =>
                edu?.institute?.trim() ? (
                  <div key={idx} className="flex justify-between text-sm">
                    <div>
                      <p className="font-semibold">
                        {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
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
                ) : null
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);


};

export default ModernTwoColumnResume;
