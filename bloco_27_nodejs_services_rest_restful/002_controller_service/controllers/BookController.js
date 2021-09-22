const rescue = require("express-rescue");
const service = require("../services/BookService");
const Joi = require("joi");

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
    return response.status(200).json(books);
  }
});

const findById = rescue(async function (request, response, next) {
  const { id } = request.params;

  const book = await service.findById(id);

  if (!book.error) {
    return response.status(200).json(book);
  } else {
    return next(book.error);
  }
});

const create = rescue(async function (request, response, next) {
  const { error } = Joi.object({
    title: Joi.string().min(1).max(200).not().empty().required(),
    authorId: Joi.string().not().empty().required(),
  }).validate(request.body);

  if (error) {
    return next(error);
  }

  const { title, authorId } = request.body;

  const newBook = await service.create(title, authorId);

  if (newBook.error) {
    return next(newBook.error);
  } else {
    return response.status(201).json({ message: "Book created successfully!", newBook });
  }
});

module.exports = { getAll, findById, create };
