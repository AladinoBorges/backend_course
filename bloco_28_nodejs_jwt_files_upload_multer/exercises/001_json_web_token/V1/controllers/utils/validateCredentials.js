const Joi = require("joi");

function validateCredentials(data) {
  return Joi.object({
    username: Joi.string().min(5).alphanum().required(),
    password: Joi.string().min(5).required(),
  }).validate(data);
}

module.exports = { validateCredentials };
