import { createContext, useContext, useState } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  
  const [resumeData, setResumeData] = useState({
    userId: "",

    title: "",
    thumbnailLink: "",

    template: {
      theme: "",
      colorPalate: [], 
    },

    profileInfo: {
      fullName: "",
      title: "", 
      email: "",
      phone: "",
      address: "",
      summary: "",
      profileImage: "",
    },

    contactLinks: {
      website: "",
      linkedIn: "",
      github: "",
      leetcode: "",
    },

    education: [
      {
        institute: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        grade: "",
        description: "",
      },
    ],

    experience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        location: "",
        description: "",
      },
    ],

    projects: [
      {
        name: "",
        description: "",
        techStack: [],
        link: "",
        github: "",
      },
    ],

    skills: {
      technical: [],
      soft: [],
      tools: [],
      languages: [],
    },

    certifications: [
      {
        name: "",
        issuer: "",
        date: "",
        credentialId: "",
        credentialUrl: "",
      },
    ],

    hobbies: [""],
    achievements: [""],

    languages: [
      {
        name: "",
        progress: 0,
      },
    ],
  });

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);

