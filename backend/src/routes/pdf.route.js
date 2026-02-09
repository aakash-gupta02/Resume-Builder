import express from "express";
import { generatePDF } from "../controllers/pdf.controller.js";
import { conditionalAuth } from "../middleware/auth.middleware.js";
import validateParams from "../middleware/validateParams.middleware.js";
import { resumeIdSchema } from "../schemas/resume.schema.js";

const router = express.Router();

/**
 * @route POST /api/pdf/generate/:id
 * @desc Generate PDF for a resume
 * @access Private/Public (based on resume publicAccess)
 */
router.post(
  "/generate/:id",
  validateParams(resumeIdSchema),
  conditionalAuth,
  generatePDF
);

export default router;
