import { useEffect } from "react";
import { useResume } from "../../context/ResumeContext";
import CollapsibleSection from "../CollapsibleSection";

const AchievementsSection = () => {
  const { resume, setResume } = useResume();

  useEffect(() => {
    if (!resume.sections.some((s) => s.type === "achievements")) {
      setResume((prev) => ({
        ...prev,
        sections: [
          ...prev.sections,
          {
            type: "achievements",
            title: "Achievements",
            order: prev.sections.length + 1,
            visible: true,
            items: [],
          },
        ],
      }));
    }
  }, []);


  const achievementsSection = resume.sections.find(
    (sec) => sec.type === "achievements"
  );

  if (!achievementsSection) return null;

  const items = achievementsSection.items || [];

  /* ---------- HELPERS ---------- */

  const updateAchievement = (index, value) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === "achievements"
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

  const addAchievement = () => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === "achievements"
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

  const removeAchievement = (index) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === "achievements"
          ? {
            ...sec,
            items: sec.items.filter((_, i) => i !== index),
          }
          : sec
      ),
    }));
  };

  return (
    <CollapsibleSection title="Achievements" defaultOpen={false}>
      <div className="space-y-3">

        <button
          type="button"
          onClick={addAchievement}
          className="px-3 py-1 bg-blue-50 text-blue-600 rounded border text-sm"
        >
          + Add Achievement
        </button>

        {items.length === 0 && (
          <p className="text-xs text-gray-500">
            Add notable achievements like awards, recognitions, publications.
          </p>
        )}

        {items.map((item, index) => (
          <div
            key={index}
            className="flex gap-2 items-start"
          >
            <textarea
              value={item.values.text || ""}
              onChange={(e) =>
                updateAchievement(index, e.target.value)
              }
              placeholder="Hackathon Winner, Published Paper, etc."
              rows={2}
              className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={() => removeAchievement(index)}
              className="text-red-500 text-sm mt-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
};

export default AchievementsSection;
