import { StatusCodes } from "http-status-codes";
import CatchAsync from "../utils/CatchAsync.js";
import { generateResumePDF } from "../services/pdf.service.js";
import { checkResumeAccessService } from "../services/resume.service.js";
import ApiError from "../utils/ApiError.js";

/**
 * Generate PDF for a resume
 * @route POST /api/pdf/generate/:id
 * @access Private/Public (based on resume publicAccess)
 */
export const generatePDF = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(" ")[1] || null;
  const userId = req.user?.userid || null;

  // Check resume access
  const resume = await checkResumeAccessService(id);

  // If resume is not public, verify user owns it
  if (!resume.publicAccess) {
    if (!userId) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Authentication required");
    }
    if (resume.userId.toString() !== userId.toString()) {
      throw new ApiError(StatusCodes.FORBIDDEN, "Unauthorized to access this resume");
    }
  }

  // Generate PDF
  const pdfBuffer = await generateResumePDF(id, token);

  // Set response headers for PDF download
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="resume-${id}.pdf"`
  );
  res.setHeader("Content-Length", pdfBuffer.length);

  // Send PDF buffer
  res.send(pdfBuffer);
});
