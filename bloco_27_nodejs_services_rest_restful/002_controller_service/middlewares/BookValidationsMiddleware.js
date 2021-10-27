const Joi = require('joi');
const { ObjectId } = require('mongodb');

const BookModel = require('../models/mongo/BookModel');
const AuthorModel = require('../models/mongo/AuthorModel');

async function checkIfAuthorExists(request, _response, next) {
  const { id } = request.params;

  const user = await AuthorModel.getById(id);

  if (!user) {
    return next({ code: 'notFound', message: `Nenhum autor registrado com o id ${id}` });
  }

  return next();
}

function dataValidator(data) {
  const result = Joi.object({
    title: Joi.string().min(1).max(300).required(),
    authorId: Joi.string()
      .custom((value, helper) => {
        if (!ObjectId.isValid(value)) {
          return helper.message(`O campo 'authorId' é inválido`);
        }

        return true;
      })
      .required(),
  })
    .messages({
      'any.required': 'O campo {{#label}} é obrigatório',
      'string.base': 'O campo {{#label}} tem de ser do tipo "string"',
      'string.empty': 'O campo {{#label}} não pode estar vazio',
      'string.max': 'O campo {{#label}} não pode ter mais do que {{#limit}} caracteres',
      'string.min': 'O campo {{#label}} deve ter pelo menos {{#limit}} caracteres',
    })
    .validate(data);

  return result;
}

async function submitedData(request, _response, next) {
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

async function checkIfExists(request, _response, next) {
  const { body } = request;

  const bookExists = await BookModel.findByTitleAndAuthorId(body);

  if (bookExists) {
    return next({
      error: {
        code: 'alreadyExists',
        message: 'Este livro já se encontra cadastrado',
      },
    });
  }

  return next();
}

module.exports = {
  checkIfExists,
  checkIfAuthorExists,
  submitedData,
};
