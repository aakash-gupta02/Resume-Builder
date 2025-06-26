import { useResume } from "../../context/ResumeContext";

const ResumePreview = () => {
  const { resumeData } = useResume();
  const { fullName, title, email } = resumeData.profileInfo;

  return (
    <div className="text-left">
      <h1 className="text-2xl font-bold">{fullName}</h1>
      <p className="text-gray-600">{title}</p>
      <p className="text-sm mt-2">{email}</p>
      {/* Add more preview sections */}
    </div>
  );
};

export default ResumePreview;
