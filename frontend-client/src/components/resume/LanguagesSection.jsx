import { useResume } from "../../context/ResumeContext";

const LanguagesSection = () => {
  const { resumeData, setResumeData } = useResume();

  const languages = resumeData.languages || [];

  const updateLanguage = (index, field, value) => {
    const updated = [...languages];
    updated[index] = {
      ...updated[index],
      [field]: field === "progress" ? parseInt(value) : value,
    };
    setResumeData({ ...resumeData, languages: updated });
  };

  const addLanguage = () => {
    setResumeData({
      ...resumeData,
      languages: [...languages, { name: '', progress: 0 }]
    });
  };

  const removeLanguage = (index) => {
    const updated = languages.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, languages: updated });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Languages</h2>
        <button
          type="button"
          onClick={addLanguage}
          className="px-3 py-1 bg-blue-50 text-blue-600 rounded border border-blue-200 hover:bg-blue-100 flex items-center text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Language
        </button>
      </div>

      {languages.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No languages added. Click "Add Language" to add languages you speak.
        </div>
      ) : (
        languages.map((lang, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-md p-4 mb-4 bg-gray-50"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Language #{index + 1}</h3>
              <button
                type="button"
                onClick={() => removeLanguage(index)}
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
                  Language Name
                </label>
                <input
                  type="text"
                  value={lang.name}
                  onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="English, Spanish, French, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proficiency Level: {lang.progress}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={lang.progress}
                  onChange={(e) => updateLanguage(index, 'progress', e.target.value)}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                  <span>Fluent</span>
                  <span>Native</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default LanguagesSection;
