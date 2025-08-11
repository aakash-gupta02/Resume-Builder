import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    thumbnailLink: {
      type: String,
    },

    template: {
      theme: String,
      colorPalate: [String],
    },

    profileInfo: {
      fullName: { type: String },
      title: { type: String }, // e.g., Web Developer
      email: { type: String },
      phone: { type: String },
      address: { type: String },
      summary: { type: String }, // about me
      profileImage: { type: String }, // URL
    },

    contactLinks: {
      website: { type: String },
      linkedIn: { type: String },
      github: { type: String },
      leetcode: { type: String },
    },

    education: [
      {
        institute: String,
        degree: String,
        fieldOfStudy: String,
        startDate: Date,
        endDate: Date,
        grade: String,
        description: String,
      },
    ],

    experience: [
      {
        company: String,
        role: String,
        startDate: Date,
        endDate: Date,
        location: String,
        description: String,
      },
    ],

    projects: [
      {
        name: String,
        description: String,
        techStack: [String],
        link: String,
        github: String,
      },
    ],

    skills: {
      technical: [String], // e.g., JavaScript, Python, SQL
      soft: [String], // e.g., Communication, Teamwork
      tools: [String],
      languages: [String],
    },

    certifications: [
      {
        name: String,
        issuer: String,
        date: Date,
        credentialId: String,
        credentialUrl: String,
      },
    ],

    hobbies: [String],

    achievements: [String],

    languages: [
      {
        name: String,
        progress: Number,
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },

    publicAccess: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
