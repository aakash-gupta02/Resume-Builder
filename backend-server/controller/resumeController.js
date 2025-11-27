import Resume from "../models/resumeModel.js";

// Create Resume
export const createResume = async (req, res) => {
  try {
    const count = await Resume.countDocuments({ userId: req.user._id });
    const title = `Resume ${count + 1}`;

    const newResume = await Resume.create({
      userId: req.user._id,
      title,
      ...req.body,
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

    const existingResume = await Resume.findById(id);
    if (!existingResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Authorization check
    if (existingResume.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        message: "Unauthorized to update this resume" 
      });
    }

    // Use findByIdAndUpdate for better Mongoose integration
    const updatedResume = await Resume.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true } // Returns updated doc + runs validation
    );

    res.status(200).json({
      message: "Resume updated successfully",
      resume: updatedResume,
    });
  } catch (error) {
    console.error("Update Resume Error:", error.message);
    
    // Handle validation errors specifically
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Validation Error", 
        errors: error.errors 
      });
    }
    
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
