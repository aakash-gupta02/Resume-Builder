import { useResume } from "../../context/ResumeContext";
import CollapsibleSection from "../CollapsibleSection";

const SkillsSection = () => {
  const { resume, setResume } = useResume();

  const skillsSection = resume.sections.find(
    (sec) => sec.type === "skills"
  );

  if (!skillsSection) return null;

  const items = skillsSection.items || [];

  /* ---------- HELPERS ---------- */

  const updateCategory = (index, field, value) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === "skills"
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

  const updateSkills = (index, text) => {
    updateCategory(
      index,
      "skills",
      text
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    );
  };

  const addCategory = () => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === "skills"
          ? {
            ...sec,
            items: [
              ...sec.items,
              {
                order: sec.items.length + 1,
                values: {
                  category: "",
                  skills: [],
                },
              },
            ],
          }
          : sec
      ),
    }));
  };

  const removeCategory = (index) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === "skills"
          ? {
            ...sec,
            items: sec.items.filter((_, i) => i !== index),
          }
          : sec
      ),
    }));
  };

  return (
    <CollapsibleSection title="Skills" defaultOpen={false}>
      <div className="space-y-6">

        {items.map((item, index) => (
          <div
            key={index}
            className="border rounded-md p-4 relative bg-gray-50"
          >
            {/* REMOVE */}
            <button
              type="button"
              onClick={() => removeCategory(index)}
              className="absolute top-2 right-2 text-red-500 text-sm"
            >
              ✕
            </button>

            {/* CATEGORY */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                value={item.values.category || ""}
                onChange={(e) =>
                  updateCategory(index, "category", e.target.value)
                }
                placeholder="Frontend / Backend / Tools"
                className="w-full p-2 border rounded"
              />
            </div>

            {/* SKILLS */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills (comma separated)
              </label>
              <textarea
                rows={2}
                defaultValue={(item.values.skills || []).join(", ")}
                onBlur={(e) => updateSkills(index, e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="React, Tailwind, Redux"
              />
            </div>
          </div>
        ))}

        {/* ADD */}
        <button
          type="button"
          onClick={addCategory}
          className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded border"
        >
          + Add Skill Category
        </button>

      </div>
    </CollapsibleSection>
  );
};

export default SkillsSection;
