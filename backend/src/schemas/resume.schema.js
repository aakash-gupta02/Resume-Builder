import Joi from "joi";

// Schema for item within sections
const itemSchema = Joi.object({
  values: Joi.object().unknown(true),
  order: Joi.number().integer().min(0),
});

// Schema for sections
const sectionSchema = Joi.object({
  type: Joi.string().required().messages({
    "any.required": "Section type is required",
  }),
  title: Joi.string().required().messages({
    "any.required": "Section title is required",
  }),
  order: Joi.number().integer().min(0).default(0),
  visible: Joi.boolean().default(true),
  content: Joi.any(),
  items: Joi.array().items(itemSchema).default([]),
});

// Schema for template
const templateSchema = Joi.object({
  id: Joi.string().default("classic"),
  theme: Joi.string().default("blue"),
  styles: Joi.object().unknown(true).default({}),
});

// Schema for creating a new resume
export const createResumeSchema = Joi.object({
  title: Joi.string().max(100).trim().messages({
    "string.max": "Title should have a maximum length of 100 characters",
  }),
  thumbnailLink: Joi.string().uri().allow("").messages({
    "string.uri": "Thumbnail link must be a valid URL",
  }),
  template: templateSchema,
  sections: Joi.array().items(sectionSchema).default([]),
  publicAccess: Joi.boolean().default(false),
});

// Schema for updating a resume
export const updateResumeSchema = Joi.object({
  title: Joi.string().max(100).trim().messages({
    "string.max": "Title should have a maximum length of 100 characters",
  }),
  thumbnailLink: Joi.string().uri().allow("").messages({
    "string.uri": "Thumbnail link must be a valid URL",
  }),
  template: templateSchema,
  sections: Joi.array().items(sectionSchema),
  publicAccess: Joi.boolean(),
}).min(1).messages({
  "object.min": "At least one field must be provided for update",
});

// Schema for updating resume title only
export const updateTitleSchema = Joi.object({
  title: Joi.string().min(1).max(100).trim().required().messages({
    "string.min": "Title cannot be empty",
    "string.max": "Title should have a maximum length of 100 characters",
    "any.required": "Title is required",
  }),
});

// Schema for validating MongoDB ObjectId in params
export const resumeIdSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid resume ID format",
      "any.required": "Resume ID is required",
    }),
});
