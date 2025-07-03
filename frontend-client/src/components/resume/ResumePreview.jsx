import { useRef } from "react";
import { useResume } from "../../context/ResumeContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumePreview = () => {
  const { resumeData } = useResume();
  const printRef = useRef(null);

  const handleDownload = async () => {
    const element = printRef.current;
    if (!element) {
      console.error("Element not found for PDF generation.");
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      scrollY: -window.scrollY,
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
    <div className="max-w-4xl mx-auto p-8 bg-white font-sans text-black">
      <div ref={printRef} className="p-6">
        {/* Header: Name/Title/Contact (Left) and Links (Right) */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start space-x-4">
            {profileImage && (
              <img
                crossOrigin="anonymous"
                src={profileImage}
                alt="Profile"
                className="w-20 h-20 rounded-full"
              />
            )}

            <div>
              {fullName && <h1 className="text-3xl font-bold">{fullName}</h1>}
              {title && <p className="text-lg">{title}</p>}
              <div className="text-sm mt-2 flex ">
                {email && (
                  <p>
                    <a
                      href={`mailto:${email}`}
                      className="text-black hover:underline"
                    >
                      {email} |
                    </a>
                  </p>
                )}
                {phone && <p>{phone} | </p>}
                {address && <p> {address}</p>}
              </div>
            </div>
          </div>
          <div className="text-right text-sm">
            {[website, linkedIn, github, leetcode].some(Boolean) && (
              <div className="space-y-1">
                {website && (
                  <p>
                    <a
                      href={website}
                      className="text-black hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Website
                    </a>
                  </p>
                )}
                {linkedIn && (
                  <p>
                    <a
                      href={linkedIn}
                      className="text-black hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                  </p>
                )}
                {github && (
                  <p>
                    <a
                      href={github}
                      className="text-black hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  </p>
                )}
                {leetcode && (
                  <p>
                    <a
                      href={leetcode}
                      className="text-black hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      LeetCode
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b-2 border-black pb-1">
              Summary
            </h2>
            <p className="mt-2">{summary}</p>
          </div>
        )}

        {/* Education */}
        {education.some((e) => e.institute?.trim()) && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b-2 border-black pb-1">
              Education
            </h2>
            {education.map((edu, idx) => (
              <div key={idx} className="mt-2 flex justify-between">
                <div>
                  {edu.degree && (
                    <p className="font-semibold">
                      {edu.degree} in {edu.fieldOfStudy}
                    </p>
                  )}
                  {edu.institute && <p>{edu.institute}</p>}
                  {edu.grade && <p className="text-sm">Grade: {edu.grade}</p>}
                  {edu.description && <p className="mt-1">{edu.description}</p>}
                </div>
                {(edu.startDate || edu.endDate) && (
                  <p className="text-sm text-right">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {experience.some((exp) => exp.company?.trim() || exp.role?.trim()) && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b-2 border-black pb-1">
              Experience
            </h2>
            {experience.map((exp, idx) => (
              <div key={idx} className="mt-2 flex justify-between">
                <div>
                  <p className="font-semibold">
                    {exp.role} @ {exp.company}
                  </p>
                  {exp.location && <p className="text-sm">{exp.location}</p>}
                  {exp.description && <p className="mt-1">{exp.description}</p>}
                </div>
                {(exp.startDate || exp.endDate) && (
                  <p className="text-sm text-right">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.some((p) => p.name?.trim()) && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b-2 border-black pb-1">
              Projects
            </h2>

            {projects.map((project, idx) => (
              <div key={idx} className="mt-2">
                <div className=" flex gap-2 items-center ">
                  <p className="font-semibold">{project.name}</p>

                  {(project.link || project.github) && (
                    <p className="text-sm">
                      {project.link && (
                        <a
                          href={project.link}
                          className="text-black hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Live
                        </a>
                      )}
                      {project.github && (
                        <>
                          {project.link && " | "}
                          <a
                            href={project.github}
                            className="text-black hover:underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            GitHub
                          </a>
                        </>
                      )}
                    </p>
                  )}
                </div>

                {project.description && (
                  <p className="mt-1">{project.description}</p>
                )}
                {project.techStack?.length > 0 && (
                  <p className="text-sm">
                    Tech Stack: {project.techStack.join(", ")}
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
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b-2 border-black pb-1">
              Skills
            </h2>
            <div className="grid grid-cols-2 space-y-2 mt-2  ">
              {skills.technical?.length > 0 && (
                <p>
                  <strong>Technical:</strong> <br />{" "}
                  {skills.technical.join(", ")}
                </p>
              )}
              {skills.soft?.length > 0 && (
                <p>
                  <strong>Soft Skills:</strong> <br /> {skills.soft.join(", ")}
                </p>
              )}
              {skills.tools?.length > 0 && (
                <p>
                  <strong>Tools:</strong> <br /> {skills.tools.join(", ")}
                </p>
              )}
              {skills.languages?.length > 0 && (
                <p>
                  <strong>Languages:</strong> <br />{" "}
                  {skills.languages.join(", ")}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.some((c) => c.name?.trim()) && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b-2 border-black pb-1">
              Certifications
            </h2>
            {certifications.map((cert, idx) => (
              <div key={idx} className="mt-2 flex justify-between">
                <div>
                  <p className="font-semibold">
                    {cert.name} - {cert.issuer}
                  </p>
                  {cert.credentialUrl && (
                    <p>
                      <a
                        href={cert.credentialUrl}
                        className="text-black hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Credential
                      </a>
                    </p>
                  )}
                </div>
                {cert.date && (
                  <p className="text-sm text-right">
                    Issued: {formatDate(cert.date)}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Achievements */}
        {achievements.some((a) => a.trim()) && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b-2 border-black pb-1">
              Achievements
            </h2>
            <ul className="list-disc pl-5 mt-2">
              {achievements.map(
                (item, idx) => item && <li key={idx}>{item}</li>
              )}
            </ul>
          </div>
        )}

        {/* Languages */}
        {languages.some((lang) => lang.name?.trim()) && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b-2 border-black pb-1">
              Languages
            </h2>
            <ul className="list-disc pl-5 mt-2">
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

        {/* Hobbies */}
        {hobbies.some((h) => h.trim()) && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b-2 border-black pb-1">
              Hobbies
            </h2>
            <ul className="list-disc pl-5 mt-2">
              {hobbies.map((item, idx) => item && <li key={idx}>{item}</li>)}
            </ul>
          </div>
        )}
      </div>

      {/* Download Button */}
      {/* <div className="text-center mt-6">
        <button
          onClick={handleDownload}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Download as PDF
        </button>
      </div> */}
    </div>
  );
};

export default ResumePreview;
