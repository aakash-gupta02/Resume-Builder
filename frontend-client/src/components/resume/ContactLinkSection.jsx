import { useResume } from "../../context/ResumeContext";
import CollapsibleSection from "../CollapsibleSection";

const ContactLinksSection = () => {
  const { resumeData, setResumeData } = useResume();
  const contactLinks = resumeData.contactLinks || {};
  const handleChange = (field, value) => {
    setResumeData({
      ...resumeData,
      contactLinks: {
        ...contactLinks,
        [field]: value,
      },
    });
  };

  return (
    <CollapsibleSection title="Contact Links" defaultOpen={false}>
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Contact Links</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Personal Website
          </label>
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <span className="bg-gray-100 text-gray-500 px-3 py-2 text-sm border-r">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </span>
            <input
              type="url"
              value={contactLinks.website || ""}
              onChange={(e) => handleChange('website', e.target.value)}
              className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn
          </label>
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <span className="bg-gray-100 text-gray-500 px-3 py-2 text-sm border-r">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </span>
            <input
              type="url"
              value={contactLinks.linkedIn || ""}
              onChange={(e) => handleChange('linkedIn', e.target.value)}
              className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GitHub
          </label>
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <span className="bg-gray-100 text-gray-500 px-3 py-2 text-sm border-r">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </span>
            <input
              type="url"
              value={contactLinks.github || ""}
              onChange={(e) => handleChange('github', e.target.value)}
              className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://github.com/username"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LeetCode
          </label>
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <span className="bg-gray-100 text-gray-500 px-3 py-2 text-sm border-r">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.111.744 1.823.744 1.357 0 2.445-1.089 2.445-2.445 0-.6-.196-1.196-.613-1.613l-2.733-2.638c-.467-.467-1.089-.702-1.823-.702h-2.445c-.733 0-1.357.234-1.823.702l-4.332 4.363c-.467.468-.702 1.089-.702 1.823v2.433c0 .733.234 1.357.702 1.824l4.319 4.38c.467.467 1.089.702 1.823.702h2.433c.733 0 1.357-.235 1.823-.702l2.727-2.638c.467-.467.702-1.089.702-1.823 0-.744-.235-1.357-.702-1.824-.467-.467-1.089-.702-1.823-.702s-1.357.235-1.823.702z"/>
              </svg>
            </span>
            <input
              type="url"
              value={contactLinks.leetcode || ""}
              onChange={(e) => handleChange('leetcode', e.target.value)}
              className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://leetcode.com/username"
            />
          </div>
        </div>
      </div>
    </div>
    </CollapsibleSection>
  );
};

export default ContactLinksSection;