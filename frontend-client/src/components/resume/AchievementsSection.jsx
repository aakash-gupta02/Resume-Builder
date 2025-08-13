import { useResume } from "../../context/ResumeContext";

import React, { useState, useEffect } from "react";
import CollapsibleSection from "../CollapsibleSection";

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
      achievements: inputValue
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
    });
  };

  return (
    <CollapsibleSection title="Achievements" defaultOpen={false}>
      <div>
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
    </CollapsibleSection>
  );
};

export default AchievementsSection;



// import { useResume } from "../../context/ResumeContext";
// import React from "react";
// import CollapsibleSection from "../CollapsibleSection";
// import QuillEditor from "../QuillEditor";

// const AchievementsSection = () => {
//   const { resumeData, setResumeData } = useResume();

//   const handleChange = (htmlContent) => {
//     // Convert HTML list items to array
//     const tempDiv = document.createElement('div');
//     tempDiv.innerHTML = htmlContent;
//     const achievements = Array.from(tempDiv.querySelectorAll('li'))
//       .map(li => li.textContent.trim())
//       .filter(Boolean);
    
//     setResumeData({
//       ...resumeData,
//       achievements
//     });
//   };

//   // Convert achievements array to HTML list
//   const achievementsHtml = resumeData.achievements?.length > 0
//     ? `<ul>${resumeData.achievements.map(a => `<li>${a}</li>`).join('')}</ul>`
//     : '';

//   return (
//     <CollapsibleSection title="Achievements" defaultOpen={false}>
//       <QuillEditor
//         value={achievementsHtml}
//         onChange={handleChange}
//         placeholder="List your achievements (press Enter for new bullet points)..."
//       />
//       <p className="mt-2 text-xs text-gray-500">
//         Use bullet points for your achievements (press Enter for new points)
//       </p>
//     </CollapsibleSection>
//   );
// };

// export default AchievementsSection;