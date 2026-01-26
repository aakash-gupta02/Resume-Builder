import { useResume } from "../../context/ResumeContext";
import CollapsibleSection from "../CollapsibleSection";

const ExperienceSection = () => {
  const { resume, setResume } = useResume();

  const experienceSection = resume.sections.find(
    (sec) => sec.type === "experience"
  );

  if (!experienceSection) return null;

  const items = experienceSection.items || [];

  /* ---------- HELPERS ---------- */

  const updateField = (index, field, value) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === "experience"
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

  const updateArrayFromText = (index, field, text) => {
    updateField(
      index,
      field,
      text
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    );
  };

  const addExperience = () => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === "experience"
          ? {
            ...sec,
            items: [
              ...sec.items,
              {
                order: sec.items.length + 1,
                values: {
                  company: "",
                  role: "",
                  employmentType: "",
                  startDate: "",
                  endDate: "",
                  location: "",
                  responsibilities: [],
                },
              },
            ],
          }
          : sec
      ),
    }));
  };

  const removeExperience = (index) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === "experience"
          ? {
            ...sec,
            items: sec.items.filter((_, i) => i !== index),
          }
          : sec
      ),
    }));
  };

  return (
    <CollapsibleSection title="Experience" defaultOpen={false}>
      <div className="space-y-4">

        <button
          type="button"
          onClick={addExperience}
          className="px-3 py-1 bg-blue-50 text-blue-600 rounded border text-sm"
        >
          + Add Experience
        </button>

        {items.map((item, index) => {
          const exp = item.values;

          return (
            <div
              key={index}
              className="border rounded-md p-4 bg-gray-50"
            >
              <div className="flex justify-between mb-3">
                <h3 className="font-medium">
                  Experience #{index + 1}
                </h3>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Company"
                  value={exp.company || ""}
                  onChange={(v) =>
                    updateField(index, "company", v)
                  }
                />

                <Input
                  label="Role"
                  value={exp.role || ""}
                  onChange={(v) =>
                    updateField(index, "role", v)
                  }
                />

                <Input
                  label="Employment Type"
                  value={exp.employmentType || ""}
                  onChange={(v) =>
                    updateField(index, "employmentType", v)
                  }
                  placeholder="Internship / Full-time / Contract"
                />

                <Input
                  label="Location"
                  value={exp.location || ""}
                  onChange={(v) =>
                    updateField(index, "location", v)
                  }
                />

                <Input
                  label="Start Date"
                  type="month"
                  value={exp.startDate || ""}
                  onChange={(v) =>
                    updateField(index, "startDate", v)
                  }
                />

                <Input
                  label="End Date"
                  type="month"
                  value={exp.endDate || ""}
                  onChange={(v) =>
                    updateField(index, "endDate", v)
                  }
                />
              </div>

              <Textarea
                label="Responsibilities / Achievements (comma separated)"
                defaultValue={(exp.responsibilities || []).join(", ")}
                onBlur={(v) =>
                  updateArrayFromText(
                    index,
                    "responsibilities",
                    v
                  )
                }
                placeholder="Improved X, Led Y, Increased Z by 20%"
              />
            </div>
          );
        })}
      </div>
    </CollapsibleSection>
  );
};

export default ExperienceSection;

/* ---------- SMALL INPUTS ---------- */

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

const Textarea = ({
  label,
  defaultValue,
  onBlur,
  placeholder,
}) => (
  <div className="mt-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <textarea
      rows={3}
      defaultValue={defaultValue}
      onBlur={(e) => onBlur(e.target.value)}
      placeholder={placeholder}
      className="w-full p-2 border rounded"
    />
  </div>
);
