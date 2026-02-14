"use client";

import { createContext, useContext, useState, useCallback } from "react";

const ResumeContext = createContext(null);

// Default customization settings
export const defaultCustomization = {
  // Colors
  colors: {
    primary: "#2563eb",      // Blue
    secondary: "#64748b",    // Slate
    accent: "#0891b2",       // Cyan
    background: "#ffffff",   // White
    text: "#1f2937",         // Gray 800
    heading: "#111827",      // Gray 900
    border: "#e5e7eb",       // Gray 200
    sectionBg: "#f8fafc",    // Light gray
  },

  // Typography
  typography: {
    bodyFont: "Inter",
    headingFont: "Inter",
    baseFontSize: 14,        // px
    lineHeight: 1.5,
    headingSizeScale: 1.2,
    letterSpacing: 0,
  },

  // Spacing
  spacing: {
    pageMargin: 40,          // px
    sectionGap: 24,          // px
    itemGap: 16,             // px
    contentPadding: 16,      // px
  },

  // Layout
  layout: {
    columns: "single",       // single, two-column, sidebar-left, sidebar-right
    sidebarWidth: 35,        // % for sidebar layouts
    headerStyle: "classic",  // classic, modern, minimal, banner
    showPhoto: true,
    photoSize: 80,           // px
    photoStyle: "circle",    // circle, rounded, square
    contactStyle: "inline",  // inline, stacked, grid, icons
  },

  // Section styles
  sectionStyles: {
    headingStyle: "underline", // simple, underline, background, border-left, border-bottom, uppercase
    borderRadius: 8,
    showDividers: false,
    dividerStyle: "solid",     // solid, dashed, dotted, double
    dateFormat: "MMM YYYY",
  },

  // Additional options
  options: {
    showIcons: true,
    showSkillBars: true,
    showLanguageBars: true,
    accentBullets: true,
    capitalizeHeadings: false,
    compactMode: false,
  },
};

// Font options
export const fontOptions = [
  { value: "Inter", label: "Inter" },
  { value: "Roboto", label: "Roboto" },
  { value: "Open Sans", label: "Open Sans" },
  { value: "Lato", label: "Lato" },
  { value: "Poppins", label: "Poppins" },
  { value: "Montserrat", label: "Montserrat" },
  { value: "Playfair Display", label: "Playfair Display" },
  { value: "Merriweather", label: "Merriweather" },
  { value: "Source Sans Pro", label: "Source Sans Pro" },
  { value: "Nunito", label: "Nunito" },
  { value: "Raleway", label: "Raleway" },
  { value: "Ubuntu", label: "Ubuntu" },
];

// Color presets
export const colorPresets = [
  {
    name: "Professional Blue",
    colors: { primary: "#2563eb", secondary: "#64748b", accent: "#0891b2" },
  },
  {
    name: "Corporate Gray",
    colors: { primary: "#374151", secondary: "#6b7280", accent: "#4b5563" },
  },
  {
    name: "Modern Green",
    colors: { primary: "#059669", secondary: "#64748b", accent: "#0d9488" },
  },
  {
    name: "Creative Purple",
    colors: { primary: "#7c3aed", secondary: "#64748b", accent: "#8b5cf6" },
  },
  {
    name: "Elegant Red",
    colors: { primary: "#dc2626", secondary: "#64748b", accent: "#ef4444" },
  },
  {
    name: "Ocean Teal",
    colors: { primary: "#0891b2", secondary: "#64748b", accent: "#06b6d4" },
  },
  {
    name: "Warm Orange",
    colors: { primary: "#ea580c", secondary: "#64748b", accent: "#f97316" },
  },
  {
    name: "Classic Black",
    colors: { primary: "#171717", secondary: "#525252", accent: "#404040" },
  },
];

// Default resume data
export const defaultResumeData = {
  title: "My Resume",
  thumbnailLink: "",
  template: {
    id: "modern",
    theme: "blue",
    styles: {},
  },
  sections: [
    {
      id: "profile",
      type: "profile",
      title: "Profile",
      order: 1,
      visible: true,
      content: {
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        linkedin: "",
        github: "",
        profileImage: "",
      },
    },
    {
      id: "summary",
      type: "summary",
      title: "Professional Summary",
      order: 2,
      visible: true,
      content: {
        text: "",
      },
    },
    {
      id: "experience",
      type: "experience",
      title: "Work Experience",
      order: 3,
      visible: true,
      items: [],
    },
    {
      id: "education",
      type: "education",
      title: "Education",
      order: 4,
      visible: true,
      items: [],
    },
    {
      id: "skills",
      type: "skills",
      title: "Skills",
      order: 5,
      visible: true,
      items: [],
    },
    {
      id: "projects",
      type: "projects",
      title: "Projects",
      order: 6,
      visible: true,
      items: [],
    },
    {
      id: "certifications",
      type: "certifications",
      title: "Certifications",
      order: 7,
      visible: false,
      items: [],
    },
    {
      id: "languages",
      type: "languages",
      title: "Languages",
      order: 8,
      visible: false,
      items: [],
    },
    {
      id: "achievements",
      type: "achievements",
      title: "Achievements",
      order: 9,
      visible: false,
      items: [],
    },
    {
      id: "hobbies",
      type: "hobbies",
      title: "Interests & Hobbies",
      order: 10,
      visible: false,
      items: [],
    },
  ],
  publicAccess: false,
};

export function ResumeProvider({ children }) {
  const [resume, setResume] = useState(defaultResumeData);
  const [customization, setCustomization] = useState(defaultCustomization);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Reset resume to default
  const resetResume = useCallback(() => {
    setResume(defaultResumeData);
    setCustomization(defaultCustomization);
    setHasUnsavedChanges(false);
  }, []);

  // Load resume data
  const loadResume = useCallback((data) => {
    // Merge loaded data with defaults to ensure sections exist
    const mergedResume = {
      ...defaultResumeData,
      ...data,
      sections: data.sections?.length > 0 
        ? data.sections 
        : defaultResumeData.sections,
    };
    setResume(mergedResume);
    if (data.template?.styles) {
      setCustomization((prev) => ({
        ...prev,
        ...data.template.styles,
      }));
    }
    setHasUnsavedChanges(false);
  }, []);

  // Update section content (for profile, summary)
  const updateSectionContent = useCallback((sectionType, field, value) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === sectionType
          ? { ...sec, content: { ...sec.content, [field]: value } }
          : sec
      ),
    }));
    setHasUnsavedChanges(true);
  }, []);

  // Update section visibility
  const toggleSectionVisibility = useCallback((sectionType) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === sectionType ? { ...sec, visible: !sec.visible } : sec
      ),
    }));
    setHasUnsavedChanges(true);
  }, []);

  // Update section title
  const updateSectionTitle = useCallback((sectionType, title) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === sectionType ? { ...sec, title } : sec
      ),
    }));
    setHasUnsavedChanges(true);
  }, []);

  // Reorder sections
  const reorderSections = useCallback((newOrder) => {
    setResume((prev) => ({
      ...prev,
      sections: newOrder.map((type, index) => {
        const section = prev.sections.find((s) => s.type === type);
        return { ...section, order: index + 1 };
      }),
    }));
    setHasUnsavedChanges(true);
  }, []);

  // Update item in a section
  const updateItem = useCallback((sectionType, index, field, value) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === sectionType
          ? {
              ...sec,
              items: sec.items.map((item, i) =>
                i === index
                  ? { ...item, values: { ...item.values, [field]: value } }
                  : item
              ),
            }
          : sec
      ),
    }));
    setHasUnsavedChanges(true);
  }, []);

  // Add item to section
  const addItem = useCallback((sectionType, defaultValues = {}) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === sectionType
          ? {
              ...sec,
              items: [
                ...sec.items,
                { order: sec.items.length + 1, values: defaultValues },
              ],
            }
          : sec
      ),
    }));
    setHasUnsavedChanges(true);
  }, []);

  // Remove item from section
  const removeItem = useCallback((sectionType, index) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === sectionType
          ? { ...sec, items: sec.items.filter((_, i) => i !== index) }
          : sec
      ),
    }));
    setHasUnsavedChanges(true);
  }, []);

  // Reorder items within a section
  const reorderItems = useCallback((sectionType, newItems) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.type === sectionType
          ? {
              ...sec,
              items: newItems.map((item, index) => ({
                ...item,
                order: index + 1,
              })),
            }
          : sec
      ),
    }));
    setHasUnsavedChanges(true);
  }, []);

  // Update customization - accepts partial customization object
  const updateCustomization = useCallback((updates) => {
    setCustomization((prev) => {
      const newCustomization = { ...prev };
      // Deep merge each category
      Object.keys(updates).forEach((category) => {
        if (typeof updates[category] === 'object' && updates[category] !== null) {
          newCustomization[category] = {
            ...prev[category],
            ...updates[category],
          };
        } else {
          newCustomization[category] = updates[category];
        }
      });
      return newCustomization;
    });
    setHasUnsavedChanges(true);
  }, []);

  // Apply color preset
  const applyColorPreset = useCallback((preset) => {
    setCustomization((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        ...preset,
      },
    }));
    setHasUnsavedChanges(true);
  }, []);

  // Reset customization to defaults
  const resetCustomization = useCallback(() => {
    setCustomization(defaultCustomization);
    setHasUnsavedChanges(true);
  }, []);

  // Get section by type
  const getSection = useCallback(
    (type) => resume.sections.find((s) => s.type === type),
    [resume.sections]
  );

  // Get visible sections sorted by order
  const getVisibleSections = useCallback(
    () =>
      resume.sections
        .filter((s) => s.visible)
        .sort((a, b) => a.order - b.order),
    [resume.sections]
  );

  // Prepare resume for saving
  const prepareForSave = useCallback(() => {
    return {
      ...resume,
      template: {
        ...resume.template,
        styles: customization,
      },
    };
  }, [resume, customization]);

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume,
        customization,
        setCustomization,
        hasUnsavedChanges,
        setHasUnsavedChanges,
        resetResume,
        loadResume,
        updateSectionContent,
        toggleSectionVisibility,
        updateSectionTitle,
        reorderSections,
        updateItem,
        addItem,
        removeItem,
        reorderItems,
        updateCustomization,
        applyColorPreset,
        resetCustomization,
        getSection,
        getVisibleSections,
        prepareForSave,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}
