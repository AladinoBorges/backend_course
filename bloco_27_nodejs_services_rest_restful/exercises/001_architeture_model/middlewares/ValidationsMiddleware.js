const Joi = require('joi');
const { ObjectId } = require('mongodb');

function idValidation(request, _response, next) {
  const { id } = request.params;

  if (!ObjectId.isValid(id)) {
    return next({ code: 'invalidData', message: 'Identificador inválido' });
  }

  return next();
}

function dataValidator(data) {
  const result = Joi.object({
    firstName: Joi.string().min(2).max(100).required(),
    lastName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(128).required(),
  })
    .messages({
      'any.required': 'O campo {{#label}} é obrigatório',
      'string.base': 'O campo {{#label}} tem de ser do tipo "string"',
      'string.email': 'O campo {{#label}} é inválido, informe um correto',
      'string.empty': 'O campo {{#label}} não pode estar vazio',
      'string.max': 'O campo {{#label}} não pode ter mais do que {{#limit}} caracteres',
      'string.min': 'O campo {{#label}} deve ter pelo menos {{#limit}} caracteres',
    })
    .validate(data);

  return result;
}

function dataValidation(request, _response, next) {
  const { body } = request;

  const { error: validationError } = dataValidator(body);

  if (validationError) {
    return next({
      code: 'invalidData',
      message: `${validationError.details[0].message.replace(/"/g, "'")}`,
    });
  }

  return next();
}

module.exports = { idValidation, dataValidation };
