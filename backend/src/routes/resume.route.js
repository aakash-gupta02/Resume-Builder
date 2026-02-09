import express from "express";
import {
  createResume,
  getAllResumes,
  getResume,
  updateResume,
  deleteResume,
  updateResumeTitle,
  toggleResumeAccess,
} from "../controllers/resume.controller.js";
import { protect, conditionalAuth } from "../middleware/auth.middleware.js";
import validate from "../middleware/validateRequest.middleware.js";
import validateParams from "../middleware/validateParams.middleware.js";
import {
  createResumeSchema,
  updateResumeSchema,
  updateTitleSchema,
  resumeIdSchema,
} from "../schemas/resume.schema.js";

const router = express.Router();

// Public/Conditional access route (checks if resume is public or user is authenticated)
router.get("/:id", validateParams(resumeIdSchema), conditionalAuth, getResume);

// Protected routes - require authentication
router.use(protect);

router.post("/", validate(createResumeSchema), createResume);
router.get("/", getAllResumes);

router.patch(
  "/:id",
  validateParams(resumeIdSchema),
//   validate(updateResumeSchema),
  updateResume
);

router.delete("/:id", validateParams(resumeIdSchema), deleteResume);

router.patch(
  "/:id/title",
  validateParams(resumeIdSchema),
  validate(updateTitleSchema),
  updateResumeTitle
);

router.patch(
  "/:id/access",
  validateParams(resumeIdSchema),
  toggleResumeAccess
);

export default router;
