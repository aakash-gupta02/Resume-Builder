import { StatusCodes } from "http-status-codes";
import CatchAsync from "../utils/CatchAsync.js";
import sendResponse from "../utils/ApiResponse.js";
import {
  createResumeService,
  getAllResumesService,
  getResumeByIdService,
  updateResumeService,
  deleteResumeService,
  updateResumeTitleService,
  toggleResumeAccessService,
} from "../services/resume.service.js";

/**
 * Create a new resume
 * @route POST /api/resume
 * @access Private
 */
export const createResume = CatchAsync(async (req, res) => {
  const userId = req.user.userid;
  const resume = await createResumeService(userId, req.body);

  sendResponse(res, StatusCodes.CREATED, "Resume created successfully", { resume });
});

/**
 * Get all resumes for logged in user
 * @route GET /api/resume
 * @access Private
 */
export const getAllResumes = CatchAsync(async (req, res) => {
  const userId = req.user.userid;
  const resumes = await getAllResumesService(userId);

  sendResponse(res, StatusCodes.OK, "Resumes retrieved successfully", { resumes });
});

/**
 * Get a single resume by ID
 * @route GET /api/resume/:id
 * @access Private/Public (based on publicAccess)
 */
export const getResume = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.userid || null;

  const resume = await getResumeByIdService(id, userId);

  sendResponse(res, StatusCodes.OK, "Resume retrieved successfully", { resume });
});

/**
 * Update a resume
 * @route PATCH /api/resume/:id
 * @access Private
 */
export const updateResume = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userid;

  const resume = await updateResumeService(id, userId, req.body);

  sendResponse(res, StatusCodes.OK, "Resume updated successfully", { resume });
});

/**
 * Delete a resume
 * @route DELETE /api/resume/:id
 * @access Private
 */
export const deleteResume = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userid;

  await deleteResumeService(id, userId);

  sendResponse(res, StatusCodes.OK, "Resume deleted successfully");
});

/**
 * Update resume title
 * @route PATCH /api/resume/:id/title
 * @access Private
 */
export const updateResumeTitle = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const userId = req.user.userid;

  const resume = await updateResumeTitleService(id, userId, title);

  sendResponse(res, StatusCodes.OK, "Resume title updated successfully", { resume });
});

/**
 * Toggle resume public access
 * @route PATCH /api/resume/:id/access
 * @access Private
 */
export const toggleResumeAccess = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userid;

  const { publicAccess } = await toggleResumeAccessService(id, userId);

  sendResponse(
    res,
    StatusCodes.OK,
    `Resume access ${publicAccess ? "enabled" : "disabled"} successfully`,
    { publicAccess }
  );
});
