import resume from "../models/resumeModel.js";
import Resume1 from "../models/resumeModel.js";

export const createResume = async (req, res) => {
  try {
   

    const defaultResumeData = {
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
    }; 

    const count = await resume.countDocuments({ userId: req.user._id });
    const title = `Resume ${count + 1}`;

    const newResume = await resume.create({
      userId: req.user.id,
      ...defaultResumeData,
      ...req.body,
      title,
    });

    res.status(201).json({
      message: "Resume created successfully",
      resume: newResume,
    });
  } catch (error) {
    console.error("Create Resume Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const resume = await Resume1.findById(id);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    if (resume.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this resume" });
    }

    Object.assign(resume, updates);
    const updatedResume = await resume.save();

    res.status(200).json({
      message: "Resume updated successfully",
      resume: updatedResume,
    });
  } catch (error) {
    console.error("Update Resume Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume1.findById(id);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    if (resume.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this resume" });
    }

    const deletedResume = await Resume1.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted Successfully", deletedResume });
  } catch (error) {
    console.log("Error Deleting Resume", error);
    res.status(400).json({ message: "Internal Server Error" });
  }
};

// all resume
export const getResume = async (req, res) => {
  try {
    const allResume = await resume.find({ userId: req.user._id });

    res.status(200).json({ allResume });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
};

// one resume
export const oneResume = async (req, res) => {
  const { id } = req.params;
  try {
    const resume1 = await resume.findById({ id });

    res.status(200).json(resume1);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
};
