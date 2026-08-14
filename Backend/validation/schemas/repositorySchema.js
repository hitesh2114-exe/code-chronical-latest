const Joi = require("joi");

const createRepositorySchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required().messages({
    "string.base": "Repository name must be a string.",
    "string.empty": "Repository name is required.",
    "string.min": "Repository name must be at least 3 characters long.",
    "string.max": "Repository name cannot exceed 100 characters.",
    "any.required": "Repository name is required.",
  }),

  description: Joi.string().trim().allow("").default("").messages({
    "string.base": "Description must be a string.",
  }),

  visibility: Joi.string()
    .valid("public", "private")
    .default("public")
    .messages({
      "string.base": "Visibility must be a string.",
      "any.only": "Visibility must be either 'public' or 'private'.",
    }),
});

module.exports = {
  createRepositorySchema,
};
