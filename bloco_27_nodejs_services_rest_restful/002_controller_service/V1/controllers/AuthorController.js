const rescue = require("express-rescue");
const service = require("../services/AuthorService");

const getAll = rescue(async function (_request, response) {
  const authors = await service.getAll();

  return response.status(200).json(authors);
});

const findById = rescue(async function (request, response, next) {
  const { id } = request.params;

  const { author, error } = await service.findById(id);

  if (error) {
    return next(error);
  } else {
    return response.status(200).json(author);
  }
});

const create = rescue(async function (request, response, next) {
  const { firstName, middleName, lastName, birthday, nationality } = request.body;

  const { newAuthor, error } = await service.create(
    firstName,
    middleName,
    lastName,
    birthday,
    nationality,
  );

  if (error) {
    return next(error);
  } else {
    return response.status(200).json(newAuthor);
  }
});

module.exports = { getAll, findById, create };
