import { useResume } from "../../context/ResumeContext";

import React, { useState, useEffect } from "react";
const AchievementsSection = () => {
  const { resumeData, setResumeData } = useResume();

  const achievements = resumeData.achievements || [];
  const [inputValue, setInputValue] = useState(achievements.join(", "));

  useEffect(() => {
    setInputValue(achievements.join(", "));
  }, [achievements]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    setResumeData({
      ...resumeData,
      achievements: inputValue.split(",").map((a) => a.trim()).filter(Boolean),
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Achievements</h2>
      <textarea
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Hackathon Winner, Published Paper, etc. (comma separated)"
        rows="2"
      ></textarea>
      <p className="mt-1 text-xs text-gray-500">
        Separate each achievement with a comma
      </p>
    </div>
  );
};

export default AchievementsSection;
