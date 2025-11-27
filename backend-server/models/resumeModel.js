import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    values: mongoose.Schema.Types.Mixed,
    order: Number,
  },
);



const sectionSchema = new mongoose.Schema(
  {
    type: String,            // "experience", "education", "custom"
    title: String,           // user visible
    order: Number,           // order of sections
    visible: { type: Boolean, default: true },

    content: mongoose.Schema.Types.Mixed,  // for summary/about sections

    items: [itemSchema],
  },
);

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    title: { type: String, required: true },
    thumbnailLink: String,

    template: {
      id: String,
      theme: String,
      colors: [String],
      styles: Object,
    },

    sections: [sectionSchema],

    publicAccess: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
