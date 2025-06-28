import { useResume } from "../../context/ResumeContext";

const ContactLinksSection = () => {
  const { resumeData, setResumeData } = useResume();
  const handleChange = (e) => {
    setResumeData({
      ...resumeData,
      contactLinks: {
        ...resumeData.contactLinks,
        [e.target.name]: e.target.value,
      },
    });
  };

  const { website, linkedIn, github, leetcode } = resumeData.contactLinks;

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Contact Links</h2>
      <input name="website" value={website} onChange={handleChange} placeholder="Website" className="input" />
      <input name="linkedIn" value={linkedIn} onChange={handleChange} placeholder="LinkedIn" className="input" />
      <input name="github" value={github} onChange={handleChange} placeholder="GitHub" className="input" />
      <input name="leetcode" value={leetcode} onChange={handleChange} placeholder="LeetCode" className="input" />
    </div>
  );
};
export default ContactLinksSection;