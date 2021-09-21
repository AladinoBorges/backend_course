const rescue = require("express-rescue");
const service = require("../services/AuthorService");
const Joi = require("joi");

const getAll = rescue(async function (_request, response) {
  const authors = await service.getAll();

  return response.status(200).json(authors);
});

const findById = rescue(async function (request, response, next) {
  const { id } = request.params;

  const author = await service.findById(id);

  if (author.error) {
    return next(author.error);
  } else {
    return response.status(200).json(author);
  }
});

const create = rescue(async function (request, response, next) {
  const { error } = Joi.object({
    firstName: Joi.string().min(2).max(150).not().empty().required(),
    middleName: Joi.string().min(2).max(150).not().empty(),
    lastName: Joi.string().min(2).max(150).not().empty().required(),
    birthday: Joi.date().not().empty().required(),
    nationality: Joi.string().min(2).max(150).not().empty().required(),
  }).validate(request.body);

  if (error) {
    return next(error);
  }

  const { firstName, middleName, lastName, birthday, nationality } = request.body;

  const newAuthor = await service.create(firstName, middleName, lastName, birthday, nationality);

  if (newAuthor.error) {
    return next(newAuthor.error);
  } else {
    return response.status(200).json(newAuthor);
  }
});

module.exports = { getAll, findById, create };
