import { useResume } from "../../context/ResumeContext";


const EducationSection = () => {
  const { resumeData, setResumeData } = useResume();

  const handleChange = (index, e) => {
    const newEducation = [...resumeData.education];
    newEducation[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, education: newEducation });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          institute: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          grade: "",
          description: "",
        },
      ],
    });
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Education</h2>
      {resumeData.education?.map((edu, index) => (
        <div key={index} className="space-y-2">
          <input name="institute" value={edu.institute} onChange={(e) => handleChange(index, e)} placeholder="Institute" className="input" />
          <input name="degree" value={edu.degree} onChange={(e) => handleChange(index, e)} placeholder="Degree" className="input" />
          <input name="fieldOfStudy" value={edu.fieldOfStudy} onChange={(e) => handleChange(index, e)} placeholder="Field of Study" className="input" />
          <input name="startDate" value={edu.startDate} onChange={(e) => handleChange(index, e)} placeholder="Start Date" className="input" />
          <input name="endDate" value={edu.endDate} onChange={(e) => handleChange(index, e)} placeholder="End Date" className="input" />
          <input name="grade" value={edu.grade} onChange={(e) => handleChange(index, e)} placeholder="Grade" className="input" />
          <textarea name="description" value={edu.description} onChange={(e) => handleChange(index, e)} placeholder="Description" className="input" />
        </div>
      ))}
      <button onClick={addEducation} className="btn">+ Add Education</button>
    </div>
  );
};
export default EducationSection;
