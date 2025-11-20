import College from "../models/collegeModel.js";
import Review from "../models/reviewModel.js";
import Joi from "joi";


const collegeSchema = Joi.object({
  name: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().optional(),
});

export const createCollege = async (req, res) => {
  const { error } = collegeSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { name, location, description } = req.body;
  const existing = await College.findOne({ name });
  if (existing) return res.status(400).json({ error: "College already exists" });

  const college = await College.create({ name, location, description });
  res.status(201).json({ message: "College created successfully", college });
};

export const getAllColleges = async (req, res) => {
  const colleges = await College.find().sort({ averageRating: -1 });
  res.status(200).json({ count: colleges.length, colleges });
};


export const getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }
    res.status(200).json(college);
  } catch (error) {
    res.status(500).json({ message: "Error fetching college", error });
  }
};


export const updateCollege = async (req, res) => {
  const { error } = collegeSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const college = await College.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!college) return res.status(404).json({ error: "College not found" });
  res.status(200).json({ message: "College updated successfully", college });
};

export const deleteCollege = async (req, res) => {
  const college = await College.findById(req.params.id);
  if (!college) return res.status(404).json({ error: "College not found" });

  await Review.deleteMany({ college: college._id });
  await college.deleteOne();

  res.status(200).json({ message: "College deleted successfully" });
};


export const updateCollegeStats = async (collegeId) => {
  const stats = await Review.aggregate([
    { $match: { college: collegeId } },
    {
      $group: {
        _id: "$college",
        averageRating: { $avg: "$rating" },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await College.findByIdAndUpdate(collegeId, {
      averageRating: stats[0].averageRating.toFixed(2),
      reviewCount: stats[0].reviewCount,
    });
  } else {
    await College.findByIdAndUpdate(collegeId, { averageRating: 0, reviewCount: 0 });
  }
};
