const Joi = require('joi');

const AuthorModel = require('../models/mongo/AuthorModel');

function dataValidator(data) {
  const result = Joi.object({
    firstName: Joi.string().min(2).max(100).required(),
    middleName: Joi.string().min(2).max(100).optional(),
    lastName: Joi.string().min(2).max(100).required(),
    birthday: Joi.date().not().empty().optional(),
    nationality: Joi.string().min(4).max(100).optional(),
  })
    .messages({
      'any.required': 'O campo {{#label}} é obrigatório',
      'string.base': 'O campo {{#label}} tem de ser do tipo "string"',
      'date.base': 'O campo {{#label}} não é uma data válida',
      'string.empty': 'O campo {{#label}} não pode estar vazio',
      'string.max': 'O campo {{#label}} não pode ter mais do que {{#limit}} caracteres',
      'string.min': 'O campo {{#label}} deve ter pelo menos {{#limit}} caracteres',
    })
    .validate(data);

  return result;
}

function submitedData(request, _response, next) {
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

async function checkIfExistsByFullname(request, _response, next) {
  const { body } = request;

  const authorExists = await AuthorModel.findByName(body);
  if (authorExists) {
    return next({
      code: 'alreadyExists',
      message: 'Um autor já está registrado com este nome completo',
    });
  }

  return next();
}

module.exports = {
  submitedData,
  checkIfExistsByFullname,
};
