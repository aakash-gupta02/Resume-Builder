import { useResume } from "../../context/ResumeContext";

const ExperienceSection = () => {
  const { resumeData, setResumeData } = useResume();

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          company: '',
          role: '',
          startDate: '',
          endDate: '',
          location: '',
          description: '',
        },
      ],
    });
  };

  const removeExperience = (index) => {
    const newExperience = resumeData.experience.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, experience: newExperience });
  };

  const updateExperience = (index, field, value) => {
    const newExperience = [...resumeData.experience];
    newExperience[index] = {
      ...newExperience[index],
      [field]: value,
    };
    setResumeData({ ...resumeData, experience: newExperience });
  };

  const experience = resumeData.experience || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Work Experience</h2>
        <button
          type="button"
          onClick={addExperience}
          className="px-3 py-1 bg-blue-50 text-blue-600 rounded border border-blue-200 hover:bg-blue-100 flex items-center text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Experience
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No work experience entries. Click "Add Experience" to add your work history.
        </div>
      ) : (
        experience.map((exp, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-md p-4 mb-4 bg-gray-50"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Experience #{index + 1}</h3>
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="text-red-500 hover:text-red-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Company Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role/Position
                </label>
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) => updateExperience(index, 'role', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Software Developer, Project Manager, etc."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <div className="flex items-center">
                    <input
                      type="date"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => updateExperience(index, 'location', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="City, Country or Remote"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={exp.description}
                onChange={(e) => updateExperience(index, 'description', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your responsibilities, achievements, and technologies used..."
                rows="3"
              ></textarea>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ExperienceSection;
