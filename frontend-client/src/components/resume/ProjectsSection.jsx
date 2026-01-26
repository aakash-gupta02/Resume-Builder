import { useResume } from "../../context/ResumeContext";
// import { useState } from "react";
import CollapsibleSection from "../CollapsibleSection";

const ProjectsSection = () => {
  const { resume, setResume } = useResume();

  const projectsSection = resume.sections.find(
    (sec) => sec.type === "projects"
  );

  if (!projectsSection) return null;

  const items = projectsSection.items || [];

  /* ---------- HELPERS ---------- */

  const updateProjectField = (index, field, value) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === "projects"
          ? {
              ...sec,
              items: sec.items.map((item, i) =>
                i === index
                  ? {
                      ...item,
                      values: {
                        ...item.values,
                        [field]: value,
                      },
                    }
                  : item
              ),
            }
          : sec
      ),
    }));
  };

  const updateArrayFieldFromText = (index, field, text) => {
    updateProjectField(
      index,
      field,
      text
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    );
  };

  const addProject = () => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === "projects"
          ? {
              ...sec,
              items: [
                ...sec.items,
                {
                  order: sec.items.length + 1,
                  values: {
                    name: "",
                    description: "",
                    techStack: [],
                    highlights: [],
                    link: "",
                    github: "",
                  },
                },
              ],
            }
          : sec
      ),
    }));
  };

  const removeProject = (index) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === "projects"
          ? {
              ...sec,
              items: sec.items.filter((_, i) => i !== index),
            }
          : sec
      ),
    }));
  };

  return (
    <CollapsibleSection title="Projects" defaultOpen={false}>
      <div className="space-y-4">

        <button
          type="button"
          onClick={addProject}
          className="px-3 py-1 bg-blue-50 text-blue-600 rounded border text-sm"
        >
          + Add Project
        </button>

        {items.map((item, index) => {
          const project = item.values;

          return (
            <div
              key={index}
              className="border rounded-md p-4 bg-gray-50"
            >
              <div className="flex justify-between mb-3">
                <h3 className="font-medium">Project #{index + 1}</h3>
                <button
                  onClick={() => removeProject(index)}
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Project Name"
                  value={project.name || ""}
                  onChange={(v) =>
                    updateProjectField(index, "name", v)
                  }
                />

                <Input
                  label="GitHub"
                  value={project.github || ""}
                  onChange={(v) =>
                    updateProjectField(index, "github", v)
                  }
                />

                <Input
                  label="Live Link"
                  value={project.link || ""}
                  onChange={(v) =>
                    updateProjectField(index, "link", v)
                  }
                />

                <Textarea
                  label="Tech Stack (comma separated)"
                  defaultValue={(project.techStack || []).join(", ")}
                  onBlur={(v) =>
                    updateArrayFieldFromText(index, "techStack", v)
                  }
                />
              </div>

              <Textarea
                label="Description"
                value={project.description || ""}
                onChange={(v) =>
                  updateProjectField(index, "description", v)
                }
              />

              <Textarea
                label="Highlights (comma separated)"
                defaultValue={(project.highlights || []).join(", ")}
                onBlur={(v) =>
                  updateArrayFieldFromText(index, "highlights", v)
                }
                placeholder="Improved X by Y, Reduced Z by 30%"
              />
            </div>
          );
        })}
      </div>
    </CollapsibleSection>
  );
};

export default ProjectsSection;

/* ---------- SMALL INPUTS ---------- */

const Input = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      className="w-full p-2 border rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const Textarea = ({
  label,
  value,
  defaultValue,
  onChange,
  onBlur,
  placeholder,
}) => (
  <div className="mt-3">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <textarea
      className="w-full p-2 border rounded"
      rows={2}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={onChange && ((e) => onChange(e.target.value))}
      onBlur={onBlur && ((e) => onBlur(e.target.value))}
    />
  </div>
);
