import { useResume } from "../../context/ResumeContext";
import React, { useState, useEffect } from "react";
import CollapsibleSection from "../CollapsibleSection";

const HobbiesSection = () => {
  const { resumeData, setResumeData } = useResume();

  const hobbies = resumeData.hobbies || [];
  const [inputValue, setInputValue] = useState(hobbies.join(", "));

  useEffect(() => {
    setInputValue(hobbies.join(", "));
  }, [hobbies]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    setResumeData({
      ...resumeData,
      hobbies: inputValue
        .split(",")
        .map((h) => h.trim())
        .filter(Boolean),
    });
  };

  return (
    <CollapsibleSection title="Hobbies & Interests" defaultOpen={false}>
      <div>
        <h2 className="text-xl font-semibold mb-3">Hobbies & Interests</h2>
        <textarea
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Reading, Photography, Hiking, etc. (comma separated)"
          rows="2"
        ></textarea>
        <p className="mt-1 text-xs text-gray-500">
          Separate each hobby with a comma
        </p>
      </div>{" "}
    </CollapsibleSection>
  );
};

export default HobbiesSection;
