const Joi = require("joi");

const createRepositorySchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required(),

  description: Joi.string()
    .trim()
    .allow("")
    .default(""),

  visibility: Joi.string()
    .valid("public", "private")
    .default("private"),
});

module.exports = {
  createRepositorySchema,
};