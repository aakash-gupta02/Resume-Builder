import { StatusCodes } from "http-status-codes";
import Resume from "../models/resume.model.js";
import ApiError from "../utils/ApiError.js";

/**
 * Create a new resume for user
 * @param {string} userId - The user's ID
 * @param {Object} resumeData - Resume data from request body
 * @returns {Promise<Object>} Created resume
 */
export const createResumeService = async (userId, resumeData = {}) => {
  const count = await Resume.countDocuments({ userId });
  const title = resumeData.title || `Resume ${count + 1}`;

  const resume = await Resume.create({
    userId,
    title,
    ...resumeData,
  });

  return resume;
};

/**
 * Get all resumes for a user
 * @param {string} userId - The user's ID
 * @returns {Promise<Array>} Array of resumes
 */
export const getAllResumesService = async (userId) => {
  const resumes = await Resume.find({ userId })
    .select("-__v")
    .sort({ createdAt: -1 })
    .lean();

  return resumes;
};

/**
 * Get a single resume by ID
 * @param {string} resumeId - The resume ID
 * @param {string|null} userId - The requesting user's ID (null for public access)
 * @returns {Promise<Object>} Resume document
 */
export const getResumeByIdService = async (resumeId, userId = null) => {
  const resume = await Resume.findById(resumeId).select("-__v").lean();

  if (!resume) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Resume not found");
  }

  // If resume is public, allow access
  if (resume.publicAccess) {
    return resume;
  }

  // If no user ID provided and resume is not public, deny access
  if (!userId) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Authentication required to access this resume");
  }

  // Check ownership
  if (resume.userId.toString() !== userId.toString()) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Unauthorized to access this resume");
  }

  return resume;
};

/**
 * Update a resume
 * @param {string} resumeId - The resume ID
 * @param {string} userId - The user's ID
 * @param {Object} updates - Update data
 * @returns {Promise<Object>} Updated resume
 */
export const updateResumeService = async (resumeId, userId, updates) => {
  const resume = await Resume.findById(resumeId);

  if (!resume) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Resume not found");
  }

  if (resume.userId.toString() !== userId.toString()) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Unauthorized to update this resume");
  }

  const updatedResume = await Resume.findByIdAndUpdate(
    resumeId,
    updates,
    { new: true, runValidators: true }
  ).select("-__v").lean();

  return updatedResume;
};

/**
 * Delete a resume
 * @param {string} resumeId - The resume ID
 * @param {string} userId - The user's ID
 * @returns {Promise<void>}
 */
export const deleteResumeService = async (resumeId, userId) => {
  const resume = await Resume.findById(resumeId);

  if (!resume) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Resume not found");
  }

  if (resume.userId.toString() !== userId.toString()) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Unauthorized to delete this resume");
  }

  await Resume.findByIdAndDelete(resumeId);
};

/**
 * Update resume title
 * @param {string} resumeId - The resume ID
 * @param {string} userId - The user's ID
 * @param {string} title - New title
 * @returns {Promise<Object>} Updated resume
 */
export const updateResumeTitleService = async (resumeId, userId, title) => {
  const resume = await Resume.findById(resumeId);

  if (!resume) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Resume not found");
  }

  if (resume.userId.toString() !== userId.toString()) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Unauthorized to update this resume");
  }

  resume.title = title;
  await resume.save();

  const updatedResume = resume.toObject();
  delete updatedResume.__v;

  return updatedResume;
};

/**
 * Toggle resume public access
 * @param {string} resumeId - The resume ID
 * @param {string} userId - The user's ID
 * @returns {Promise<Object>} Object with access status
 */
export const toggleResumeAccessService = async (resumeId, userId) => {
  const resume = await Resume.findById(resumeId);

  if (!resume) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Resume not found");
  }

  if (resume.userId.toString() !== userId.toString()) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Unauthorized to modify this resume");
  }

  resume.publicAccess = !resume.publicAccess;
  await resume.save();

  return { publicAccess: resume.publicAccess };
};

/**
 * Check if resume exists and is accessible (for PDF generation)
 * @param {string} resumeId - The resume ID
 * @returns {Promise<Object>} Resume with access info
 */
export const checkResumeAccessService = async (resumeId) => {
  const resume = await Resume.findById(resumeId).select("publicAccess userId").lean();

  if (!resume) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Resume not found");
  }

  return resume;
};
