// models/Project.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [100, "Title must be ≤ 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      maxlength: [500, "Description must be ≤ 500 characters"],
    },
    tags: {
      type: [String],
      default: [],
    },
    liveUrl: {
      type: String,
      trim: true,
      default: "",
    },
    repoUrl: {
      type: String,
      trim: true,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "#00c8ff",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);