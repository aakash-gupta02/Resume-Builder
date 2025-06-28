import { useResume } from "../../context/ResumeContext";

const ProjectsSection = () => {
  const { resumeData, setResumeData } = useResume();

  const handleChange = (index, e) => {
    const updated = [...resumeData.projects];
    updated[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, projects: updated });
  };

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

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Projects</h2>
      {resumeData.projects.map((proj, index) => (
        <div key={index} className="space-y-2">
          <input
            name="name"
            value={proj.name}
            onChange={(e) => handleChange(index, e)}
            placeholder="Project Name"
            className="input"
          />
          <textarea
            name="description"
            value={proj.description}
            onChange={(e) => handleChange(index, e)}
            placeholder="Project Description"
            className="input"
          />
          <input
            name="techStack"
            value={proj.techStack}
            onChange={(e) => handleChange(index, e)}
            placeholder="Tech Stack (comma-separated)"
            className="input"
          />
          <input
            name="link"
            value={proj.link}
            onChange={(e) => handleChange(index, e)}
            placeholder="Live Link"
            className="input"
          />
          <input
            name="github"
            value={proj.github}
            onChange={(e) => handleChange(index, e)}
            placeholder="GitHub Link"
            className="input"
          />
        </div>
      ))}
      <button onClick={addProject} className="btn">
        + Add Project
      </button>
    </div>
  );
};
export default ProjectsSection;
