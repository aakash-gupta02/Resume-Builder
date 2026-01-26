import { useResume } from "../../context/ResumeContext";
import CollapsibleSection from "../CollapsibleSection";

const PROFICIENCY_LEVELS = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Fluent",
  "Native",
];

const LanguagesSection = () => {
  const { resume, setResume } = useResume();

  const languagesSection = resume.sections.find(
    (sec) => sec.type === "languages"
  );

  if (!languagesSection) return null;

  const items = languagesSection.items || [];

  /* ---------- HELPERS ---------- */

  const updateField = (index, field, value) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === "languages"
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

  const addLanguage = () => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === "languages"
          ? {
            ...sec,
            items: [
              ...sec.items,
              {
                order: sec.items.length + 1,
                values: {
                  name: "",
                  proficiency: "Beginner",
                },
              },
            ],
          }
          : sec
      ),
    }));
  };

  const removeLanguage = (index) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === "languages"
          ? {
            ...sec,
            items: sec.items.filter((_, i) => i !== index),
          }
          : sec
      ),
    }));
  };

  return (
    <CollapsibleSection title="Languages" defaultOpen={false}>
      <div className="space-y-4">

        <button
          type="button"
          onClick={addLanguage}
          className="px-3 py-1 bg-blue-50 text-blue-600 rounded border text-sm"
        >
          + Add Language
        </button>

        {items.map((item, index) => {
          const lang = item.values;

          return (
            <div
              key={index}
              className="border rounded-md p-4 bg-gray-50"
            >
              <div className="flex justify-between mb-3">
                <h3 className="font-medium">
                  Language #{index + 1}
                </h3>
                <button
                  onClick={() => removeLanguage(index)}
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Language"
                  value={lang.name || ""}
                  onChange={(v) =>
                    updateField(index, "name", v)
                  }
                  placeholder="English, Hindi, Spanish"
                />

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Proficiency
                  </label>
                  <select
                    value={lang.proficiency || "Beginner"}
                    onChange={(e) =>
                      updateField(index, "proficiency", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  >
                    {PROFICIENCY_LEVELS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </CollapsibleSection>
  );
};

export default LanguagesSection;

/* ---------- INPUT ---------- */

const Input = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full p-2 border rounded"
    />
  </div>
);
