import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError.js";
import { verifyAccessToken } from "../utils/Token.js";
import Resume from "../models/resume.model.js";

/**
 * Middleware to protect routes - requires valid JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized - Token missing")
    );
  }

  const token = authHeader.split(" ")[1];

  const decoded = verifyAccessToken(token);

  if (!decoded) {
    return next(
      new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized - Invalid or expired token")
    );
  }

  req.user = decoded;
  next();
};

/**
 * Middleware to restrict access based on user roles
 * @param {...string} roles - Allowed roles
 * @returns {Function} Express middleware
 */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(StatusCodes.FORBIDDEN, "Forbidden - Insufficient permissions"));
    }
    next();
  };
};

/**
 * Conditional authentication middleware
 * Allows access if resume is public, otherwise requires authentication
 * Used for routes that can be accessed both publicly and privately
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const conditionalAuth = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if resume exists and get its access settings
    const resume = await Resume.findById(id).select("publicAccess userId").lean();
    
    if (!resume) {
      return next(new ApiError(StatusCodes.NOT_FOUND, "Resume not found"));
    }

    // If resume is public, allow access without authentication
    if (resume.publicAccess) {
      req.user = null; // No authenticated user
      return next();
    }

    // If resume is private, require authentication
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(
        new ApiError(StatusCodes.UNAUTHORIZED, "Authentication required to access this resume")
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyAccessToken(token);

    if (!decoded) {
      return next(
        new ApiError(StatusCodes.UNAUTHORIZED, "Invalid or expired token")
      );
    }

    req.user = decoded;
    next();
  } catch (error) {
    // Handle invalid MongoDB ObjectId
    if (error.name === "CastError") {
      return next(new ApiError(StatusCodes.BAD_REQUEST, "Invalid resume ID format"));
    }
    next(error);
  }
};

/**
 * Optional authentication middleware
 * Attaches user to request if token is provided, but doesn't require it
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    const decoded = verifyAccessToken(token);
    
    if (decoded) {
      req.user = decoded;
    }
  }

  next();
};


