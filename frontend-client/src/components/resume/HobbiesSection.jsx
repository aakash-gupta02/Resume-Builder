import { useResume } from "../../context/ResumeContext";
import { useEffect } from "react";
import CollapsibleSection from "../CollapsibleSection";

const HobbiesSection = () => {
  const { resume, setResume } = useResume();

  /* ---------- ENSURE SECTION EXISTS ---------- */
  useEffect(() => {
    if (!resume.sections.some((s) => s.type === "hobbies")) {
      setResume((prev) => ({
        ...prev,
        sections: [
          ...prev.sections,
          {
            type: "hobbies",
            title: "Hobbies & Interests",
            order: prev.sections.length + 1,
            visible: true,
            items: [],
          },
        ],
      }));
    }
  }, []);

  const hobbiesSection = resume.sections.find(
    (sec) => sec.type === "hobbies"
  );

  if (!hobbiesSection) return null;

  const items = hobbiesSection.items || [];

  /* ---------- HELPERS ---------- */

  const updateHobby = (index, value) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === "hobbies"
          ? {
              ...sec,
              items: sec.items.map((item, i) =>
                i === index
                  ? {
                      ...item,
                      values: { text: value },
                    }
                  : item
              ),
            }
          : sec
      ),
    }));
  };

  const addHobby = () => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === "hobbies"
          ? {
              ...sec,
              items: [
                ...sec.items,
                {
                  order: sec.items.length + 1,
                  values: { text: "" },
                },
              ],
            }
          : sec
      ),
    }));
  };

  const removeHobby = (index) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === "hobbies"
          ? {
              ...sec,
              items: sec.items.filter((_, i) => i !== index),
            }
          : sec
      ),
    }));
  };

  return (
    <CollapsibleSection title="Hobbies & Interests" defaultOpen={false}>
      <div className="space-y-3">

        <button
          type="button"
          onClick={addHobby}
          className="px-3 py-1 bg-blue-50 text-blue-600 rounded border text-sm"
        >
          + Add Hobby
        </button>

        {items.length === 0 && (
          <p className="text-xs text-gray-500">
            Add interests that reflect your personality or lifestyle.
          </p>
        )}

        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              value={item.values.text || ""}
              onChange={(e) =>
                updateHobby(index, e.target.value)
              }
              placeholder="Reading, Chess, Fitness, Music"
              className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={() => removeHobby(index)}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
};

export default HobbiesSection;
