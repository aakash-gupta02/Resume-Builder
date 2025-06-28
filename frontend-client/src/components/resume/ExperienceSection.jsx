import { useResume } from "../../context/ResumeContext";

const ExperienceSection = () => {
  const { resumeData, setResumeData } = useResume();

  const handleChange = (index, e) => {
    const updated = [...resumeData.experience];
    updated[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, experience: updated });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, {
        company: '', role: '', startDate: '', endDate: '', location: '', description: ''
      }],
    });
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Experience</h2>
      {resumeData.experience.map((exp, index) => (
        <div key={index} className="space-y-2">
          <input name="company" value={exp.company} onChange={(e) => handleChange(index, e)} placeholder="Company" className="input" />
          <input name="role" value={exp.role} onChange={(e) => handleChange(index, e)} placeholder="Role" className="input" />
          <input name="startDate" value={exp.startDate} onChange={(e) => handleChange(index, e)} placeholder="Start Date" className="input" />
          <input name="endDate" value={exp.endDate} onChange={(e) => handleChange(index, e)} placeholder="End Date" className="input" />
          <input name="location" value={exp.location} onChange={(e) => handleChange(index, e)} placeholder="Location" className="input" />
          <textarea name="description" value={exp.description} onChange={(e) => handleChange(index, e)} placeholder="Description" className="input" />
        </div>
      ))}
      <button onClick={addExperience} className="btn">+ Add Experience</button>
    </div>
  );
};
export default ExperienceSection;
