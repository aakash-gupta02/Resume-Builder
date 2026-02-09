/**
 * Middleware to validate request params against a Joi schema
 * @param {Object} schema - Joi schema for params validation
 * @returns {Function} Express middleware
 */
const validateParams = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.params, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};

export default validateParams;
