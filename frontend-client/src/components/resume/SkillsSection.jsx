import { useResume } from "../../context/ResumeContext";
import React, { useState, useEffect } from "react";

const SkillsSection = () => {
  const { resumeData, setResumeData } = useResume();

  const skills = resumeData.skills || {
    technical: [],
    soft: [],
    tools: [],
    languages: [],
  };

  const [technicalInput, setTechnicalInput] = useState(skills.technical.join(", "));
  const [softInput, setSoftInput] = useState(skills.soft.join(", "));
  const [toolsInput, setToolsInput] = useState(skills.tools.join(", "));
  const [languagesInput, setLanguagesInput] = useState(skills.languages.join(", "));

  useEffect(() => {
    setTechnicalInput(skills.technical.join(", "));
  }, [skills.technical]);
  useEffect(() => {
    setSoftInput(skills.soft.join(", "));
  }, [skills.soft]);
  useEffect(() => {
    setToolsInput(skills.tools.join(", "));
  }, [skills.tools]);
  useEffect(() => {
    setLanguagesInput(skills.languages.join(", "));
  }, [skills.languages]);

  const handleBlur = (type, value) => {
    setResumeData({
      ...resumeData,
      skills: {
        ...skills,
        [type]: value.split(",").map((skill) => skill.trim()).filter(Boolean),
      },
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Skills</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Technical Skills
        </label>
        <textarea
          value={technicalInput}
          onChange={(e) => setTechnicalInput(e.target.value)}
          onBlur={() => handleBlur("technical", technicalInput)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="JavaScript, React, Node.js, etc. (comma separated)"
          rows="2"
        ></textarea>
        <p className="mt-1 text-xs text-gray-500">
          Separate each skill with a comma
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Soft Skills
        </label>
        <textarea
          value={softInput}
          onChange={(e) => setSoftInput(e.target.value)}
          onBlur={() => handleBlur("soft", softInput)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Communication, Leadership, Teamwork, etc. (comma separated)"
          rows="2"
        ></textarea>
        <p className="mt-1 text-xs text-gray-500">
          Separate each skill with a comma
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tools & Platforms
        </label>
        <textarea
          value={toolsInput}
          onChange={(e) => setToolsInput(e.target.value)}
          onBlur={() => handleBlur("tools", toolsInput)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Git, Docker, AWS, VS Code, etc. (comma separated)"
          rows="2"
        ></textarea>
        <p className="mt-1 text-xs text-gray-500">
          Separate each tool with a comma
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Languages (Programming & Human)
        </label>
        <textarea
          value={languagesInput}
          onChange={(e) => setLanguagesInput(e.target.value)}
          onBlur={() => handleBlur("languages", languagesInput)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="English (Native), Spanish (Intermediate), Python, Java, etc. (comma separated)"
          rows="2"
        ></textarea>
        <p className="mt-1 text-xs text-gray-500">
          Separate each language with a comma
        </p>
      </div>
    </div>
  );
};

export default SkillsSection;
