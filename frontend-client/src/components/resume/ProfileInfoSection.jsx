import { useRef } from "react";
import { useResume } from "../../context/ResumeContext";
import CollapsibleSection from "../CollapsibleSection";

const ProfileInfoSection = () => {
  const { resumeData, setResumeData } = useResume();
  const fileInputRef = useRef(null);

  const profileInfo = resumeData.profileInfo || {};

  const handleChange = (field, value) => {
    setResumeData({
      ...resumeData,
      profileInfo: {
        ...profileInfo,
        [field]: value,
      },
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <CollapsibleSection title="Profile Information" defaultOpen={false}>
    <div className="space-y-4">

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={profileInfo.fullName || ""}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                value={profileInfo.title || ""}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Frontend Developer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={profileInfo.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="johndoe@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={profileInfo.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+1 123-456-7890"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              value={profileInfo.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="City, Country"
            />
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Image
          </label>
          <div className="flex flex-col items-center">
            {profileInfo.profileImage ? (
              <div className="relative mb-2">
                <img
                  src={profileInfo.profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => handleChange("profileImage", "")}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              id="profile-image"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <label
              htmlFor="profile-image"
              className="cursor-pointer px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded border border-blue-200 hover:bg-blue-100"
            >
              {profileInfo.profileImage ? "Change Image" : "Upload Image"}
            </label>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Professional Summary
        </label>
        <textarea
          value={profileInfo.summary || ""}
          onChange={(e) => handleChange("summary", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
          placeholder="Briefly describe yourself and your key qualifications..."
        ></textarea>
      </div>
    </div>
    </CollapsibleSection>
  );
};

export default ProfileInfoSection;
