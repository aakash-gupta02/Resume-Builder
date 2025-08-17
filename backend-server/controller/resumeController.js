import Resume from "../models/resumeModel.js";

// Create Resume
export const createResume = async (req, res) => {
  try {
    const defaultResumeData = {
      thumbnailLink: "",
      template: { theme: "", colorPalate: [] },
      profileInfo: {
        fullName: "",
        title: "",
        email: "",
        phone: "",
        address: "",
        summary: "",
        profileImage: "",
      },
      contactLinks: { website: "", linkedIn: "", github: "", leetcode: "" },
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
        { name: "", description: "", techStack: [], link: "", github: "" },
      ],
      skills: { technical: [], soft: [], tools: [], languages: [] },
      certifications: [
        { name: "", issuer: "", date: "", credentialId: "", credentialUrl: "" },
      ],
      hobbies: [""],
      achievements: [""],
      languages: [{ name: "", progress: 0 }],
    };

    const count = await Resume.countDocuments({ userId: req.user._id });
    const title = `Resume ${count + 1}`;

    const newResume = await Resume.create({
      userId: req.user._id,
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

// Update Resume
export const updateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const existing = await Resume.findById(id);
    if (!existing) return res.status(404).json({ message: "Resume not found" });

    if (existing.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this resume" });
    }

    Object.assign(existing, updates);
    const updated = await existing.save();

    res.status(200).json({
      message: "Resume updated successfully",
      resume: updated,
    });
  } catch (error) {
    console.error("Update Resume Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Resume
export const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findById(id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    if (resume.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this resume" });
    }

    await Resume.findByIdAndDelete(id);

    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Delete Resume Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Resumes
export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ resume: resumes });
  } catch (error) {
    console.error("Get All Resumes Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Single Resume
export const getSingleResume = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findById(id);

    if (!resume) return res.status(404).json({ message: "Resume not found" });

    if (resume.publicAccess) {
      return res.status(200).json({ resume });
    }

    if (resume.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to access this resume" });
    }

    res.status(200).json({ resume });
  } catch (error) {
    console.error("Get Resume Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTitle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const resume = await Resume.findById(id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    if (resume.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this resume" });
    }

    resume.title = title;
    await resume.save();

    res.status(200).json({
      message: "Resume title updated successfully",
      resume,
    });
  } catch (error) {
    console.error("Update Resume Title Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const toggleResumeAccess = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findById(id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    if (resume.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to access this resume" });
    }

    resume.publicAccess = !resume.publicAccess;
    await resume.save();
    res.status(200).json({
      message: `Resume access ${
        resume.publicAccess ? "enabled" : "disabled"
      } successfully`,
      access: resume.publicAccess,
    });
  } catch (error) {
    console.error("Get Resume Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
