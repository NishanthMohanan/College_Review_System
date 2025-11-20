import mongoose from "mongoose";
import Review from "../models/reviewModel.js";
import College from "../models/collegeModel.js";

export const updateCollegeStats = async (collegeId) => {
  try {
    const objectId = new mongoose.Types.ObjectId(collegeId);

    const stats = await Review.aggregate([
      { $match: { college: objectId } },
      {
        $group: {
          _id: "$college",
          averageRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 },
        },
      },
    ]);

    console.log("Stats result:", stats);

    if (stats.length > 0) {
      await College.findByIdAndUpdate(collegeId, {
        averageRating: Number(stats[0].averageRating.toFixed(1)),
        reviewCount: stats[0].reviewCount,
      });
    } else {
      await College.findByIdAndUpdate(collegeId, {
        averageRating: 0,
        reviewCount: 0,
      });
    }

    console.log(` College stats updated for ${collegeId}`);
  } catch (error) {
    console.error(" Error updating college stats:", error);
  }
};
