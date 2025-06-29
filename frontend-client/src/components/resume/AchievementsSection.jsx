import { useResume } from "../../context/ResumeContext";

const AchievementsSection = () => {
  const { resumeData, setResumeData } = useResume();

  const handleChange = (index, e) => {
    const updated = [...resumeData.achievements];
    updated[index] = e.target.value;
    setResumeData({ ...resumeData, achievements: updated });
  };

  const addAchievement = () => {
    setResumeData({
      ...resumeData,
      achievements: [...resumeData.achievements, ""]
    });
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Achievements</h2>
      {resumeData.achievements?.map((item, index) => (
        <input key={index} value={item} onChange={(e) => handleChange(index, e)} placeholder="Achievement" className="input" />
      ))}
      <button onClick={addAchievement} className="btn">+ Add Achievement</button>
    </div>
  );
};
export default AchievementsSection;

