import { useResume } from "../../context/ResumeContext";

const HobbiesSection = () => {
  const { resumeData, setResumeData } = useResume();

  const handleChange = (index, e) => {
    const updated = [...resumeData.hobbies];
    updated[index] = e.target.value;
    setResumeData({ ...resumeData, hobbies: updated });
  };

  const addHobby = () => {
    setResumeData({
      ...resumeData,
      hobbies: [...resumeData.hobbies, ""]
    });
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Hobbies</h2>
      {resumeData.hobbies?.map((item, index) => (
        <input key={index} value={item} onChange={(e) => handleChange(index, e)} placeholder="Hobby" className="input" />
      ))}
      <button onClick={addHobby} className="btn">+ Add Hobby</button>
    </div>
  );
};
export default HobbiesSection;
