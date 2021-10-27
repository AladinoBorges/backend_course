const rescue = require("express-rescue");
const Joi = require("joi");

const service = require("../services/BookService");

const getAll = rescue(async function (request, response, next) {
  const { authorId } = request.query;

  if (!authorId) {
    const books = await service.getAll();

    return response.status(200).json(books);
  }

  const { error } = Joi.object({
    authorId: Joi.number().not().empty(),
  }).validate(request.query);

  if (error) {
    return next(error);
  }

  const books = await service.searchByAuthorId(authorId);

  if (books.error) {
    return next(books.error);
  } else {
    return response.status(200).json(books.books);
  }
});

const findById = rescue(async function (request, response, next) {
  const { id } = request.params;

  const { book, error } = await service.findById(id);

  if (!error) {
    return response.status(200).json(book);
  } else {
    return next(error);
  }
});

const create = rescue(async function (request, response, next) {
  const { title, authorId } = request.body;

  const { newBook, error } = await service.create(title, authorId);

  if (error) {
    return next(error);
  } else {
    return response.status(201).json({ message: "Livro criado com sucesso!", newBook });
  }
});

module.exports = { getAll, findById, create };
