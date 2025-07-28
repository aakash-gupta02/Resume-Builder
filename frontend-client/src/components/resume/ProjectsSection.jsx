import { useResume } from "../../context/ResumeContext";
import { useState } from "react";
import CollapsibleSection from "../CollapsibleSection";

const ProjectsSection = () => {
  const { resumeData, setResumeData } = useResume();
  const [techStackInputs, setTechStackInputs] = useState({});

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        {
          name: "",
          description: "",
          techStack: [],
          link: "",
          github: "",
        },
      ],
    });
  };

  const removeProject = (index) => {
    const newProjects = resumeData.projects.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, projects: newProjects });

    // Clean up the corresponding input
    const newInputs = { ...techStackInputs };
    delete newInputs[index];
    setTechStackInputs(newInputs);
  };

  const updateProject = (index, field, value) => {
    const newProjects = [...resumeData.projects];
    newProjects[index] = {
      ...newProjects[index],
      [field]: value,
    };
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const handleTechStackInput = (index, value) => {
    // Update the local input state
    setTechStackInputs((prev) => ({ ...prev, [index]: value }));

    // Process and update the actual techStack in resume data
    const technologies = value
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech);

    const newProjects = [...resumeData.projects];
    newProjects[index] = {
      ...newProjects[index],
      techStack: technologies,
    };
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const projects = resumeData.projects || [];

  return (
    <CollapsibleSection title="Projects" defaultOpen={false}>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Projects</h2>
        <button
          type="button"
          onClick={addProject}
          className="px-3 py-1 bg-blue-50 text-blue-600 rounded border border-blue-200 hover:bg-blue-100 flex items-center text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No project entries. Click "Add Project" to showcase your work.
        </div>
      ) : (
        projects.map((project, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-md p-4 mb-4 bg-gray-50"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Project #{index + 1}</h3>
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="text-red-500 hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => updateProject(index, "name", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="E-Commerce Platform, Portfolio Website, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tech Stack
                </label>
                <input
                  type="text"
                  value={techStackInputs[index] || project.techStack.join(", ")}
                  onChange={(e) => handleTechStackInput(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="React, Node.js, MongoDB, etc. (comma separated)"
                />
                {project.techStack.length > 0 && (
                  <div className="mt-1 text-xs text-gray-500">
                    Technologies: {project.techStack.join(", ")}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Live Link
                </label>
                <input
                  type="url"
                  value={project.link}
                  onChange={(e) => updateProject(index, "link", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://project-url.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub Repository
                </label>
                <input
                  type="url"
                  value={project.github}
                  onChange={(e) =>
                    updateProject(index, "github", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Description
              </label>
              <textarea
                value={project.description}
                onChange={(e) =>
                  updateProject(index, "description", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Briefly describe the project, your role, and achievements..."
                rows="3"
              ></textarea>
            </div>
          </div>
        ))
      )}
    </div>
    </CollapsibleSection>
  );
};

export default ProjectsSection;
