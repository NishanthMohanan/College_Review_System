import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "College name is required"],
      unique: true,
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    description: {
      type: String,
      trim: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const College = mongoose.model("College", collegeSchema);
export default College;
