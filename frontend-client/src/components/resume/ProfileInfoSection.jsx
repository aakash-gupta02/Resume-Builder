import { useRef } from "react";
import { useResume } from "../../context/ResumeContext";
import CollapsibleSection from "../CollapsibleSection";

const ProfileInfoSection = () => {
  const { resume, updateSectionContent } = useResume();
  const fileInputRef = useRef(null);

  const profileSection = resume.sections.find(
    (sec) => sec.type === "profile"
  );

  const profile = profileSection?.content || {};

  const handleChange = (field, value) => {
    updateSectionContent("profile", field, value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      handleChange("profileImage", reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <CollapsibleSection title="Profile Information" defaultOpen={false}>
      <div className="space-y-4">

        {/* MAIN GRID */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Input
                label="Full Name"
                value={profile.fullName || ""}
                placeholder="John Doe"
                onChange={(v) => handleChange("fullName", v)}
              />

              <Input
                label="Job Title"
                value={profile.jobTitle || ""}
                placeholder="Frontend Developer"
                onChange={(v) => handleChange("jobTitle", v)}
              />

              <Input
                label="Email"
                type="email"
                value={profile.email || ""}
                placeholder="johndoe@example.com"
                onChange={(v) => handleChange("email", v)}
              />

              <Input
                label="Phone"
                type="tel"
                value={profile.phone || ""}
                placeholder="+91 9876543210"
                onChange={(v) => handleChange("phone", v)}
              />

            </div>

            <Input
              label="Address"
              value={profile.address || ""}
              placeholder="City, Country"
              onChange={(v) => handleChange("address", v)}
              className="mt-4"
            />
          </div>

          {/* IMAGE */}
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image
            </label>

            <div className="flex flex-col items-center">
              {profile.profileImage ? (
                <div className="relative mb-2">
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border"
                  />
                  <button
                    type="button"
                    onClick={() => handleChange("profileImage", "")}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 mb-2" />
              )}

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageChange}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded border"
              >
                {profile.profileImage ? "Change Image" : "Upload Image"}
              </button>
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Professional Summary
          </label>
          <textarea
            value={profile.summary || ""}
            onChange={(e) => handleChange("summary", e.target.value)}
            className="w-full p-2 border rounded min-h-[120px]"
            placeholder="Brief professional summary..."
          />
        </div>

      </div>
    </CollapsibleSection>
  );
};

export default ProfileInfoSection;

/* ---------- SMALL INPUT COMPONENT ---------- */

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
