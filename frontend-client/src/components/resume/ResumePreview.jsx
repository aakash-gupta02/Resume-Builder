import { useRef } from "react";
import { useResume } from "../../context/ResumeContext";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumePreview = () => {
  const { resumeData } = useResume();

  const printref = useRef(null);

  const handleDownload = async () => {
    const element = printref.current;

    if (!element) {
      console.error("Element not found for PDF generation.");
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2, // better quality
      useCORS: true,
      scrollY: -window.scrollY, // fix scroll capture issues
    });

    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(data);
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(data, "PNG", 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position -= pdfHeight;
      pdf.addPage();
      pdf.addImage(data, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save("resume.pdf");
  };

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
    fullName = "",
    title = "",
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

  return (
    <div
      ref={printref}
      className="bg-bgLight text-textPrimary p-6 rounded-lg shadow-md space-y-6 text-left text-sm font-sans"
    >
      {/* Profile Info */}
      {(fullName ||
        title ||
        email ||
        phone ||
        address ||
        summary ||
        profileImage) && (
        <div>
          {profileImage && (
            <img
              crossOrigin="anonymous"
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-2"
            />
          )}
          {fullName && <h1 className="text-2xl font-bold">{fullName}</h1>}
          {title && <p className="text-textSecondary">{title}</p>}
          {(email || phone || address) && (
            <p className="text-textSecondary">
              {[email, phone, address].filter(Boolean).join(" | ")}
            </p>
          )}
          {summary && <p className="mt-2">{summary}</p>}
        </div>
      )}

      {/* Contact Links */}
      {[website, linkedIn, github, leetcode].some(Boolean) && (
        <div>
          <h2 className="text-lg font-semibold mb-1">Links</h2>
          <ul className="pl-5 text-textSecondary space-y-1">
            {website && (
              <li className="before:content-['•'] before:mr-2 before:text-black">
                Website: {website}
              </li>
            )}
            {linkedIn && (
              <li className="before:content-['•'] before:mr-2 before:text-black">
                LinkedIn: {linkedIn}
              </li>
            )}
            {github && (
              <li className="before:content-['•'] before:mr-2 before:text-black">
                GitHub: {github}
              </li>
            )}
            {leetcode && (
              <li className="before:content-['•'] before:mr-2 before:text-black">
                LeetCode: {leetcode}
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Education */}
      {education.some((e) => e.institute?.trim()) && (
        <div>
          <h2 className="text-lg font-semibold mb-1">Education</h2>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-2 text-textSecondary">
              {edu.degree && (
                <p className="font-semibold text-textPrimary">
                  {edu.degree} in {edu.fieldOfStudy}
                </p>
              )}
              {edu.institute && <p>{edu.institute}</p>}
              {(edu.startDate || edu.endDate) && (
                <p>
                  {edu.startDate} - {edu.endDate}
                </p>
              )}
              {edu.grade && <p>Grade: {edu.grade}</p>}
              {edu.description && <p>{edu.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experience.some((exp) => exp.company?.trim() || exp.role?.trim()) && (
        <div>
          <h2 className="text-lg font-semibold mb-1">Experience</h2>
          {experience.map((exp, idx) => (
            <div key={idx} className="mb-2 text-textSecondary">
              <p className="font-semibold text-textPrimary">
                {exp.role} @ {exp.company}
              </p>
              {(exp.startDate || exp.endDate) && (
                <p>
                  {exp.startDate} - {exp.endDate}
                </p>
              )}
              {exp.location && <p>{exp.location}</p>}
              {exp.description && <p>{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.some((p) => p.name?.trim()) && (
        <div>
          <h2 className="text-lg font-semibold mb-1">Projects</h2>
          {projects.map((project, idx) => (
            <div key={idx} className="mb-2 text-textSecondary">
              <p className="font-semibold text-textPrimary">{project.name}</p>
              {project.description && <p>{project.description}</p>}
              {project.techStack?.length > 0 && (
                <p>Tech Stack: {project.techStack}</p>
              )}
              {(project.link || project.github) && (
                <div>
                  {project.link && (
                    <a
                      href={project.link}
                      className="text-link underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live
                    </a>
                  )}
                  {project.github && (
                    <>
                      {" | "}
                      <a
                        href={project.github}
                        className="text-link underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </a>
                    </>
                  )}
                </div>
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
        <div>
          <h2 className="text-lg font-semibold mb-1">Skills</h2>
          <div className="text-textSecondary">
            {skills.technical?.length > 0 && (
              <p>
                <strong>Technical:</strong> {skills.technical.join(", ")}
              </p>
            )}
            {skills.soft?.length > 0 && (
              <p>
                <strong>Soft Skills:</strong> {skills.soft.join(", ")}
              </p>
            )}
            {skills.tools?.length > 0 && (
              <p>
                <strong>Tools:</strong> {skills.tools.join(", ")}
              </p>
            )}
            {skills.languages?.length > 0 && (
              <p>
                <strong>Languages:</strong> {skills.languages.join(", ")}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.some((c) => c.name?.trim()) && (
        <div>
          <h2 className="text-lg font-semibold mb-1">Certifications</h2>
          {certifications.map((cert, idx) => (
            <div key={idx} className="text-textSecondary">
              <p className="font-semibold text-textPrimary">
                {cert.name} - {cert.issuer}
              </p>
              {cert.date && <p>Issued: {cert.date}</p>}
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  className="text-link underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Credential
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {achievements.some((a) => a.trim()) && (
        <div>
          <h2 className="text-lg font-semibold mb-1">Achievements</h2>
          <ul className="list-disc pl-5 text-textSecondary">
            {achievements.map((item, idx) => item && <li key={idx}>{item}</li>)}
          </ul>
        </div>
      )}

      {/* Hobbies */}
      {hobbies.some((h) => h.trim()) && (
        <div>
          <h2 className="text-lg font-semibold mb-1">Hobbies</h2>
          <ul className="list-disc pl-5 text-textSecondary">
            {hobbies.map((item, idx) => item && <li key={idx}>{item}</li>)}
          </ul>
        </div>
      )}

      {/* Languages */}
      {languages.some((lang) => lang.name?.trim()) && (
        <div>
          <h2 className="text-lg font-semibold mb-1">Languages</h2>
          <ul className="list-disc pl-5 text-textSecondary">
            {languages
              .filter((lang) => lang.name?.trim())
              .map((lang, idx) => (
                <li key={idx}>
                  {lang.name} – {lang.progress || 0}%
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
