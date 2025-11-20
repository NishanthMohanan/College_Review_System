import express from "express";
import {
  createReview,
  getAllReviews,
  getReviewsByCollege,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(getAllReviews)
  .post(protect, createReview);

router.route("/college/:collegeId")
  .get(getReviewsByCollege);

router.route("/:id")
  .put(protect, updateReview)
  .delete(protect, deleteReview);

export default router;
