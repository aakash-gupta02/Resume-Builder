import { useEffect } from "react";
import { useResume } from "../../context/ResumeContext";
import CollapsibleSection from "../CollapsibleSection";

const CertificationsSection = () => {
  const { resume, setResume } = useResume();

  useEffect(() => {
    if (!resume.sections.some((s) => s.type === "certifications")) {
      setResume((prev) => ({
        ...prev,
        sections: [
          ...prev.sections,
          {
            type: "certifications",
            title: "Certifications",
            order: prev.sections.length + 1,
            visible: true,
            items: [],
          },
        ],
      }));
    }
  }, []);


  const certificationsSection = resume.sections.find(
    (sec) => sec.type === "certifications"
  );

  if (!certificationsSection) return null;

  const items = certificationsSection.items || [];

  /* ---------- HELPERS ---------- */

  const updateField = (index, field, value) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === "certifications"
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

  const addCertification = () => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === "certifications"
          ? {
            ...sec,
            items: [
              ...sec.items,
              {
                order: sec.items.length + 1,
                values: {
                  name: "",
                  issuer: "",
                  date: "",
                  credentialId: "",
                  credentialUrl: "",
                },
              },
            ],
          }
          : sec
      ),
    }));
  };

  const removeCertification = (index) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === "certifications"
          ? {
            ...sec,
            items: sec.items.filter((_, i) => i !== index),
          }
          : sec
      ),
    }));
  };

  return (
    <CollapsibleSection title="Certifications" defaultOpen={false}>
      <div className="space-y-4">

        <button
          type="button"
          onClick={addCertification}
          className="px-3 py-1 bg-blue-50 text-blue-600 rounded border text-sm"
        >
          + Add Certification
        </button>

        {items.length === 0 && (
          <p className="text-xs text-gray-500">
            Add certifications, courses, or professional credentials.
          </p>
        )}

        {items.map((item, index) => {
          const cert = item.values;

          return (
            <div
              key={index}
              className="border rounded-md p-4 bg-gray-50"
            >
              <div className="flex justify-between mb-3">
                <h3 className="font-medium">
                  Certification #{index + 1}
                </h3>
                <button
                  onClick={() => removeCertification(index)}
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Certification Name"
                  value={cert.name || ""}
                  onChange={(v) =>
                    updateField(index, "name", v)
                  }
                />

                <Input
                  label="Issuing Organization"
                  value={cert.issuer || ""}
                  onChange={(v) =>
                    updateField(index, "issuer", v)
                  }
                />

                <Input
                  label="Date"
                  type="month"
                  value={cert.date || ""}
                  onChange={(v) =>
                    updateField(index, "date", v)
                  }
                />

                <Input
                  label="Credential ID"
                  value={cert.credentialId || ""}
                  onChange={(v) =>
                    updateField(index, "credentialId", v)
                  }
                />

                <Input
                  label="Credential URL"
                  type="url"
                  value={cert.credentialUrl || ""}
                  onChange={(v) =>
                    updateField(index, "credentialUrl", v)
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </CollapsibleSection>
  );
};

export default CertificationsSection;

/* ---------- INPUT ---------- */

const Input = ({
  label,
  value,
  onChange,
  type = "text",
}) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border rounded"
    />
  </div>
);
