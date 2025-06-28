import { useResume } from "../../context/ResumeContext";

const ProfileInfoSection = () => {
  const { resumeData, setResumeData } = useResume();

  const handleChange = (e) => {
    setResumeData({
      ...resumeData,
      profileInfo: {
        ...resumeData.profileInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  const { fullName, title, email, phone, address, summary, profileImage } =
    resumeData.profileInfo;

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold mb-2">Profile Information</h2>

      <input
        type="text"
        name="fullName"
        value={fullName}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
        placeholder="Title (e.g., Web Developer)"
        className="w-full border p-2 rounded"
      />

      <input
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full border p-2 rounded"
      />

      <input
        type="tel"
        name="phone"
        value={phone}
        onChange={handleChange}
        placeholder="Phone"
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="address"
        value={address}
        onChange={handleChange}
        placeholder="Address"
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="profileImage"
        value={profileImage}
        onChange={handleChange}
        placeholder="Profile Image URL"
        className="w-full border p-2 rounded"
      />

      <textarea
        name="summary"
        value={summary}
        onChange={handleChange}
        placeholder="Professional Summary"
        className="w-full border p-2 rounded"
        rows={4}
      />
    </div>
  );
};

export default ProfileInfoSection;
