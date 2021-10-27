const Joi = require('joi');
const rescue = require('express-rescue');

function loginValidator(data) {
  const { error } = Joi.object({
    username: Joi.string().alphanum().min(5).max(256).required(),
    password: Joi.string().min(5).max(256).required(),
  })
    .messages({
      'any.required': 'O campo {{#label}} é obrigatório',
      'string.base': 'O campo {{#label}} tem de ser do tipo "string"',
      'string.empty': 'O campo {{#label}} não pode estar vazio',
      'string.max': 'O campo {{#label}} não pode ter mais do que {{#limit}} caracteres',
      'string.min': 'O campo {{#label}} deve ter pelo menos {{#limit}} caracteres',
    })
    .validate(data);

  if (error) { return { error }; }

  return { isValid: true };
}

const loginData = rescue(async (request, _response, next) => {
  const data = request.body;

  const { error: validationError } = loginValidator(data);

  if (validationError) {
    const message = `${validationError.details[0].message.replace(/"/g, "'")}`;

    return next({ code: 'invalidData', message });
  }

  return next();
});

module.exports = { loginData };
