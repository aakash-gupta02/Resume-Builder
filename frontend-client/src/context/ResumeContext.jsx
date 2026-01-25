import { createContext, useContext, useState } from "react";

const ResumeContext = createContext(null);

/* ---------- INITIAL RESUME ---------- */

const initialResume = {
  userId: "",
  title: "My Resume",
  thumbnailLink: "",

  template: {
    id: "classic",
    theme: "blue",
    styles: {},
  },

  sections: [
    {
      id: "profile",
      type: "profile",
      title: "Profile Information",
      order: 1,
      visible: true,
      content: {
        fullName: "John Doe",
        jobTitle: "Frontend Developer",
        email: "johndoe@example.com",
        phone: "+91 9876543210",
        address: "India",
        summary: "Passionate frontend developer with MERN stack experience.",
        profileImage: "",
      },
      items: [],
    },

    {
      id: "experience",
      type: "experience",
      title: "Experience",
      order: 2,
      visible: true,
      items: [
        {
          order: 1,
          values: {
            company: "Tech Corp",
            role: "Frontend Developer Intern",
            startDate: "2024-01",
            endDate: "2024-06",
            description: "Worked on React and Tailwind UI.",
          },
        },
      ],
    },

    {
      id: "education",
      type: "education",
      title: "Education",
      order: 3,
      visible: true,
      items: [
        {
          order: 1,
          values: {
            institute: "ABC University",
            degree: "B.Tech",
            field: "Computer Science",
            startYear: "2021",
            endYear: "2025",
          },
        },
      ],
    },
  ],

  publicAccess: false,
};

/* ---------- PROVIDER ---------- */

export const ResumeProvider = ({ children }) => {
  const [resume, setResume] = useState(initialResume);

  /* ---------- HELPERS ---------- */

  const updateSectionContent = (sectionType, field, value) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === sectionType
          ? {
              ...sec,
              content: {
                ...sec.content,
                [field]: value,
              },
            }
          : sec
      ),
    }));
  };

  const updateItemValue = (sectionType, index, field, value) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === sectionType
          ? {
              ...sec,
              items: sec.items.map((item, i) =>
                i === index
                  ? {
                      ...item,
                      values: {
                        ...item.values,
                        [field]: value,
                      },
                    }
                  : item
              ),
            }
          : sec
      ),
    }));
  };

  const addItem = (sectionType, values = {}) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === sectionType
          ? {
              ...sec,
              items: [
                ...sec.items,
                { order: sec.items.length + 1, values },
              ],
            }
          : sec
      ),
    }));
  };

  const removeItem = (sectionType, index) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === sectionType
          ? {
              ...sec,
              items: sec.items.filter((_, i) => i !== index),
            }
          : sec
      ),
    }));
  };

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume,
        updateSectionContent,
        updateItemValue,
        addItem,
        removeItem,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used inside ResumeProvider");
  return ctx;
};
