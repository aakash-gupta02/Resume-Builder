import { useResume } from "../../context/ResumeContext";
import CollapsibleSection from "../CollapsibleSection";

const EducationSection = () => {
  const { resume, setResume } = useResume();

  const educationSection = resume.sections.find(
    (sec) => sec.type === "education"
  );

  if (!educationSection) return null;

  const items = educationSection.items || [];

  /* ---------- HELPERS ---------- */

  const updateField = (index, field, value) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === "education"
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

  const addEducation = () => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === "education"
          ? {
              ...sec,
              items: [
                ...sec.items,
                {
                  order: sec.items.length + 1,
                  values: {
                    institution: "",
                    degree: "",
                    startYear: "",
                    endYear: "",
                    cgpi: "",
                  },
                },
              ],
            }
          : sec
      ),
    }));
  };

  const removeEducation = (index) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === "education"
          ? {
              ...sec,
              items: sec.items.filter((_, i) => i !== index),
            }
          : sec
      ),
    }));
  };

  return (
    <CollapsibleSection title="Education" defaultOpen={false}>
      <div className="space-y-4">

        <button
          type="button"
          onClick={addEducation}
          className="px-3 py-1 bg-blue-50 text-blue-600 rounded border text-sm"
        >
          + Add Education
        </button>

        {items.map((item, index) => {
          const edu = item.values;

          return (
            <div
              key={index}
              className="border rounded-md p-4 bg-gray-50"
            >
              <div className="flex justify-between mb-3">
                <h3 className="font-medium">
                  Education #{index + 1}
                </h3>
                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Institution"
                  value={edu.institution || ""}
                  onChange={(v) =>
                    updateField(index, "institution", v)
                  }
                />

                <Input
                  label="Degree"
                  value={edu.degree || ""}
                  onChange={(v) =>
                    updateField(index, "degree", v)
                  }
                />

                <Input
                  label="Start Year"
                  type="number"
                  value={edu.startYear || ""}
                  onChange={(v) =>
                    updateField(index, "startYear", v)
                  }
                />

                <Input
                  label="End Year"
                  type="number"
                  value={edu.endYear || ""}
                  onChange={(v) =>
                    updateField(index, "endYear", v)
                  }
                />

                <Input
                  label="CGPI / GPA"
                  value={edu.cgpi || ""}
                  onChange={(v) =>
                    updateField(index, "cgpi", v)
                  }
                  placeholder="9.05/10"
                />
              </div>
            </div>
          );
        })}
      </div>
    </CollapsibleSection>
  );
};

export default EducationSection;

/* ---------- SMALL INPUT ---------- */

const Input = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border rounded"
    />
  </div>
);
