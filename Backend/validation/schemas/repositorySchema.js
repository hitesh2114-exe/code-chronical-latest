const Joi = require("joi");

const repositorySchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required(),

  description: Joi.string()
    .trim()
    .allow("")
    .max(500),

  visibility: Joi.string()
    .valid("public", "private")
    .default("private"),
});

module.exports = {
  repositorySchema,
};