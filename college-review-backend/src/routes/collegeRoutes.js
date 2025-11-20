import express from "express";
import {
  createCollege,
  getAllColleges,
  getCollegeById,
  updateCollege,
  deleteCollege,
} from "../controllers/collegeController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllColleges)
  .post(protect, authorize("admin"), createCollege);

router
  .route("/:id")
  .get(getCollegeById)
  .put(protect, authorize("admin", "teacher"), updateCollege)
  .delete(protect, authorize("admin"), deleteCollege);

export default router;
