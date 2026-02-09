import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    values: mongoose.Schema.Types.Mixed,
    order: Number,
  },
  { _id: true }
);

const sectionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    visible: {
      type: Boolean,
      default: true,
    },
    content: mongoose.Schema.Types.Mixed,
    items: [itemSchema],
  },
  { _id: true }
);

const templateSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: "classic",
    },
    theme: {
      type: String,
      default: "blue",
    },
    styles: {
      type: Object,
      default: {},
    },
  },
  { _id: false }
);

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    thumbnailLink: {
      type: String,
      default: "",
    },
    template: {
      type: templateSchema,
      default: () => ({}),
    },
    sections: {
      type: [sectionSchema],
      default: [],
    },
    publicAccess: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
resumeSchema.index({ userId: 1, createdAt: -1 });
resumeSchema.index({ publicAccess: 1 });

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
