import { useResume } from "../../context/ResumeContext";

const LanguagesSection = () => {
  const { resumeData, setResumeData } = useResume();

  const handleChange = (index, e) => {
    const updated = [...resumeData.languages];
    updated[index][e.target.name] = e.target.name === "progress" ? parseInt(e.target.value) : e.target.value;
    setResumeData({ ...resumeData, languages: updated });
  };

  const addLanguage = () => {
    setResumeData({
      ...resumeData,
      languages: [...resumeData.languages, { name: '', progress: 0 }]
    });
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Languages</h2>
      {resumeData.languages.map((lang, index) => (
        <div key={index} className="space-y-2">
          <input name="name" value={lang.name} onChange={(e) => handleChange(index, e)} placeholder="Language" className="input" />
          <input name="progress" type="number" value={lang.progress} onChange={(e) => handleChange(index, e)} placeholder="Proficiency (0–100)" className="input" />
        </div>
      ))}
      <button onClick={addLanguage} className="btn">+ Add Language</button>
    </div>
  );
};
export default LanguagesSection;
