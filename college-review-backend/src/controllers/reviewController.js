import Review from "../models/reviewModel.js";
import College from "../models/collegeModel.js";
import { updateCollegeStats } from "../utils/updateCollegeStats.js";
import Joi from "joi";

const reviewSchema = Joi.object({
  title: Joi.string().required(),
  comment: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  collegeId: Joi.string().required(),
});


export const createReview = async (req, res) => {
  try {
   
    const { error } = reviewSchema.validate(req.body);
    if (error)
      return res.status(400).json({ error: error.details[0].message });

    const { title, comment, rating, collegeId } = req.body;

    
    const college = await College.findById(collegeId);
    if (!college) return res.status(404).json({ error: "College not found" });

    
    const review = await Review.create({
      college: collegeId,
      user: req.user._id,
      title,
      comment,
      rating,
    });

    
    await updateCollegeStats(collegeId);

    return res
      .status(201)
      .json({ message: "Review added successfully", review });

  } catch (error) {
    
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "You have already reviewed this college." });
    }

    console.error("Error adding review:", error);
    return res.status(500).json({ error: "Error adding review" });
  }
};


export const getAllReviews = async (req, res) => {
  try {
    const { page = 1, limit = 5, search = "" } = req.query;
    const query = search ? { title: { $regex: search, $options: "i" } } : {};

    const total = await Review.countDocuments(query);
    const reviews = await Review.find(query)
      .populate("college", "name")
      .populate("user", "name email role")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      reviews,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching reviews" });
  }
};



export const getReviewsByCollege = async (req, res) => {
  try {
    const { collegeId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Review.countDocuments({ college: collegeId });

    const reviews = await Review.find({ college: collegeId })
      .populate("user", "name email role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      reviews,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ error: "Review not found" });

  if (review.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    return res.status(403).json({ error: "Not authorized to update this review" });
  }

  const { title, comment, rating } = req.body;
  if (title) review.title = title;
  if (comment) review.comment = comment;
  if (rating) review.rating = rating;

  await review.save();
  await updateCollegeStats(review.college);

  res.status(200).json({ message: "Review updated successfully", review });
};


export const deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ error: "Review not found" });

  if (review.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    return res.status(403).json({ error: "Not authorized to delete this review" });
  }

  await review.deleteOne();
  await updateCollegeStats(review.college);

  res.status(200).json({ message: "Review deleted successfully" });
};
