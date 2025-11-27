import express from "express";
import {
  createResume,
  updateResume,
  deleteResume,
  getAllResumes,
  getSingleResume,
  updateTitle,
  toggleResumeAccess,
} from "../controller/resumeController.js";
import { conditionalAuth, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/get/:id", conditionalAuth, getSingleResume);

router.use(protect);

router.post("/create", createResume);
router.get("/all", getAllResumes);

router.patch("/update/:id", updateResume);
router.delete("/delete/:id", deleteResume);

router.patch("/update/title/:id", updateTitle);
router.patch("/update/access/:id", toggleResumeAccess);

export default router;
