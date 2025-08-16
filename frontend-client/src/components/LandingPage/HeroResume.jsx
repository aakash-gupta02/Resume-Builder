import React from "react";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  LinkIcon,
  CodeBracketIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  LightBulbIcon,
  ArrowTopRightOnSquareIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

const HeroResume = () => {
  const resumeData = {
    name: "Aakash Gupta",
    title: "MERN Stack Developer | Frontend Focused",
    photo: "https://i.postimg.cc/br5bhJ6R/91-98920-30814-20250615-190822-4.png",
    contact: {
      email: "aakash.dev@example.com",
      phone: "+91-98765-43210",
      location: "Mumbai, India",
      linkedin: "linkedin.com/in/aakash-gupta",
      github: "github.com/aakash-gupta",
    },
    summary:
      "Self-driven MERN stack developer with hands-on experience building full-stack applications. Skilled in React, Next.js, Node.js, and MongoDB. Passionate about creating scalable products with clean, user-friendly interfaces.",
    experience: [
      {
        role: "Full Stack Developer Intern",
        company: "Order Management System",
        period: "Jan 2025 - Present",
        details: [
          "Built real-time Order Management Dashboard using Next.js 14, Redux Toolkit, and Socket.io",
          "Designed responsive UI with Tailwind CSS for customer and product data",
          "Implemented authentication, role-based access, and order state management",
        ],
      },
      {
        role: "Freelance Web Developer",
        company: "Self-Employed",
        period: "Jun 2023 - Dec 2024",
        details: [
          "Delivered custom websites and landing pages for clients using React and Node.js",
          "Created graphic designs and branding materials alongside development work",
          "Managed projects independently with client collaboration",
        ],
      },
    ],
    projects: [
      {
        name: "JobFolio - Resume Builder",
        tech: "MERN Stack, Context API, Tailwind CSS",
        link: "github.com/aakash-gupta/jobfolio",
        details: [
          "Single-page resume builder with collapsible forms and template previews",
          "Planned template marketplace and AI assistance features",
        ],
      },
      {
        name: "Phone Price Comparison",
        tech: "Node.js, Express, MongoDB, EJS",
        link: "github.com/aakash-gupta/phone-price-comparison",
        details: [
          "Compare prices from Flipkart, Amazon and other sources",
          "Features: search, filtering, wishlist, reviews",
        ],
      },
    ],
    education: [
      {
        degree: "B.S. Computer Science",
        institution: "State University",
        year: "2025 (Expected)",
        details: [
          "Relevant coursework: Data Structures, Algorithms, Web Development",
        ],
      },
      {
        degree: "Full Stack Web Development",
        institution: "Online Certification",
        year: "2024",
        details: ["MERN Stack Specialization"],
      },
    ],
    skills: {
      Frontend: [
        "React.js",
        "Next.js 14",
        "Redux Toolkit",
        "Tailwind CSS",
        "HTML5/CSS3",
      ],
      Backend: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
      Database: ["MongoDB", "Mongoose", "Firebase"],
      Tools: ["Git/GitHub", "VS Code", "Postman", "Figma", "Photoshop"],
    },
  };

  return (
    <div className="relative w-[800px] h-[1120px] bg-white shadow-2xl overflow-hidden border border-gray-200 flex flex-col">
      {/* Resume Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              {resumeData.name}
            </h1>
            <p className="text-lg text-blue-100 mt-2">{resumeData.title}</p>
          </div>
          <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-white/20 overflow-hidden">
            <img
              src={resumeData.photo}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Contact Bar */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6 text-sm">
          <div className="flex items-center">
            <EnvelopeIcon className="w-4 h-4 mr-2 text-blue-200" />
            <span>{resumeData.contact.email}</span>
          </div>
          <div className="flex items-center">
            <PhoneIcon className="w-4 h-4 mr-2 text-blue-200" />
            <span>{resumeData.contact.phone}</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="w-4 h-4 mr-2 text-blue-200" />
            <span>{resumeData.contact.location}</span>
          </div>
          <div className="flex items-center">
            <LinkIcon className="w-4 h-4 mr-2 text-blue-200" />
            <span>{resumeData.contact.linkedin}</span>
          </div>
          <div className="flex items-center">
            <CodeBracketIcon className="w-4 h-4 mr-2 text-blue-200" />
            <span>{resumeData.contact.github}</span>
          </div>
        </div>
      </div>

      {/* Resume Body - Single Column */}
      <div className="p-8 space-y-10 ">
        {/* Summary */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-300 flex items-center">
            <LightBulbIcon className="w-5 h-5 mr-2 text-blue-600" />
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-300 flex items-center">
            <BriefcaseIcon className="w-5 h-5 mr-2 text-blue-600" />
            Work Experience
          </h2>
          <div className="space-y-6">
            {resumeData.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {exp.role}
                    </h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {exp.period}
                  </span>
                </div>
                <ul className="mt-3 space-y-2 pl-5 list-disc text-gray-700">
                  {exp.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-300 flex items-center">
            <CodeBracketIcon className="w-5 h-5 mr-2 text-blue-600" />
            Key Projects
          </h2>
          <div className="space-y-6">
            {resumeData.projects.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-500">{project.tech}</p>
                  </div>
                  <a
                    href={`https://${project.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <span className="mr-1">{project.link}</span>
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  </a>
                </div>
                <ul className="mt-3 space-y-2 pl-5 list-disc text-gray-700">
                  {project.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-300 flex items-center">
            <AcademicCapIcon className="w-5 h-5 mr-2 text-blue-600" />
            Education
          </h2>
          <div className="space-y-5">
            {resumeData.education.map((edu, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                <p className="text-gray-600 text-sm">{edu.institution}</p>
                <p className="text-gray-500 text-xs mt-1">{edu.year}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-300 flex items-center">
            <LightBulbIcon className="w-5 h-5 mr-2 text-blue-600" />
            Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(resumeData.skills).map(([category, skills]) => (
              <div key={category} className="w-full">
                <h3 className="font-semibold text-gray-700 mb-2">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Info */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-300 flex items-center">
            <LightBulbIcon className="w-5 h-5 mr-2 text-blue-600" />
            Additional
          </h2>
          <div className="space-y-2">
            <div>
              <h3 className="font-medium text-gray-700">Languages</h3>
              <p className="text-sm text-gray-600">
                English (Fluent), Hindi (Native)
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Interests</h3>
              <p className="text-sm text-gray-600">
                UI/UX Design, Open Source, Tech Blogs
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Edit Overlay */}
      <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
        <button className="pointer-events-auto bg-blue-600 text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <PencilSquareIcon className="w-5 h-5" />
          <span>Edit This Resume</span>
        </button>
      </div>


    </div>
  );
};

export default HeroResume;
