import { useResume } from "../../context/ResumeContext";
import CollapsibleSection from "../CollapsibleSection";

const ProfileSection = () => {
  const { resumeData, setResumeData } = useResume();

  const handleChange = (e) => {
    setResumeData({
      ...resumeData,
      profileInfo: {
        ...resumeData.profileInfo,
        [e.target.name]: e.target.value,
      },
    });
          console.log("resume title",resumeData.title );

  };

  return (
    <CollapsibleSection title="Profile Section" defaultOpen={false}>
    <div className="p-4 bg-gray-100 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Profile Info</h2>
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={resumeData.profileInfo.fullName}
        onChange={handleChange}
        className="w-full p-2 border mb-3"
      />
      <input
        type="text"
        name="title"
        placeholder="Job Title"
        value={resumeData.profileInfo.title}
        onChange={handleChange}
        className="w-full p-2 border mb-3"
      />
      {/* Add email, phone, etc. */}
    </div>
    </CollapsibleSection>
  );
};

export default ProfileSection;
