import express from "express";
import {
  createResume,
  updateResume,
  deleteResume,
  getAllResumes,
  getSingleResume,
} from "../controller/resumeController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createResume);
router.get("/all", protect, getAllResumes);

router.put("/update/:id", protect, updateResume);
router.delete("/delete/:id", protect, deleteResume);

router.get("/get/:id", protect, getSingleResume);

export default router;
