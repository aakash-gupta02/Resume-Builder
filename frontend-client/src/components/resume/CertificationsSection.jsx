import { useResume } from "../../context/ResumeContext";
import CollapsibleSection from "../CollapsibleSection";

const CertificationsSection = () => {
  const { resumeData, setResumeData } = useResume();

  const addCertification = () => {
    setResumeData({
      ...resumeData,
      certifications: [
        ...resumeData.certifications,
        {
          name: "",
          issuer: "",
          date: "",
          credentialId: "",
          credentialUrl: "",
        },
      ],
    });
  };

  const removeCertification = (index) => {
    const newCertifications = resumeData.certifications.filter(
      (_, i) => i !== index
    );
    setResumeData({ ...resumeData, certifications: newCertifications });
  };

  const updateCertification = (index, field, value) => {
    const newCertifications = [...resumeData.certifications];
    newCertifications[index] = {
      ...newCertifications[index],
      [field]: value,
    };
    setResumeData({ ...resumeData, certifications: newCertifications });
  };

  const certifications = resumeData.certifications || [];

  return (
    <CollapsibleSection title="Certifications" defaultOpen={false}>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Certifications</h2>
        <button
          type="button"
          onClick={addCertification}
          className="px-3 py-1 bg-blue-50 text-blue-600 rounded border border-blue-200 hover:bg-blue-100 flex items-center text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Certification
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No certifications added. Click "Add Certification" to showcase your
          credentials.
        </div>
      ) : (
        certifications.map((cert, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-md p-4 mb-4 bg-gray-50"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Certification #{index + 1}</h3>
              <button
                type="button"
                onClick={() => removeCertification(index)}
                className="text-red-500 hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certification Name
                </label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) =>
                    updateCertification(index, "name", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="AWS Certified Solutions Architect, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issuing Organization
                </label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) =>
                    updateCertification(index, "issuer", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Amazon Web Services, Google, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  // value={cert.date}
                  value={
                    cert.date
                      ? new Date(cert.date).toISOString().slice(0, 10)
                      : ""
                  }
                  onChange={(e) =>
                    updateCertification(index, "date", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credential ID
                </label>
                <input
                  type="text"
                  value={cert.credentialId}
                  onChange={(e) =>
                    updateCertification(index, "credentialId", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ABC-123-XYZ"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credential URL
                </label>
                <input
                  type="url"
                  value={cert.credentialUrl}
                  onChange={(e) =>
                    updateCertification(index, "credentialUrl", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://credential-verification-link.com"
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
    </CollapsibleSection>
  );
};

export default CertificationsSection;
