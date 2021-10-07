const Joi = require("joi");

function dataValidator(data) {
  const result = Joi.object({
    firstName: Joi.string().min(2).max(100).required(),
    lastName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).validate(data);

  return result;
}

module.exports = function (request, response, next) {
  const { error: validationError } = dataValidator(request.body);

  if (validationError) {
    return response.status(401).json({
      error: true,
      message: `O campo ${validationError.details[0].message.replace(/\"/g, "'")}.`,
    });
  }

  next();
};
