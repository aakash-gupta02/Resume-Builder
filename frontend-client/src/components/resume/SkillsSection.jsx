import { useResume } from "../../context/ResumeContext";
import { useState } from "react";

const SkillsSection = () => {
  const { resumeData, setResumeData } = useResume();

  const [input, setInput] = useState({
    technical: "",
    soft: "",
    tools: "",
    languages: "",
  });

  const handleAdd = (type) => {
    if (input[type].trim() === "") return;

    setResumeData({
      ...resumeData,
      skills: {
        ...resumeData.skills,
        [type]: [...resumeData.skills[type], input[type]],
      },
    });

    setInput({ ...input, [type]: "" });
  };

  const handleRemove = (type, index) => {
    const updated = resumeData.skills[type].filter((_, i) => i !== index);

    setResumeData({
      ...resumeData,
      skills: {
        ...resumeData.skills,
        [type]: updated,
      },
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Skills</h2>

      {["technical", "soft", "tools", "languages"].map((type) => (
        <div key={type} className="mb-4">
          <label className="capitalize text-sm font-medium">{type} skills</label>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              name={type}
              value={input[type]}
              onChange={(e) =>
                setInput({ ...input, [type]: e.target.value })
              }
              placeholder={`Add a ${type} skill`}
              className="flex-1 border p-2 rounded"
            />
            <button
              onClick={() => handleAdd(type)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {resumeData.skills?.[type]?.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {skill}
                <button
                  onClick={() => handleRemove(type, index)}
                  className="text-red-500 ml-1"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsSection;
