const rescue = require('express-rescue');

const BookService = require('../services/BookService');

const getAll = rescue(async function (_request, response, _next) {
  const books = await BookService.getAll();

  return response.status(200).json(books);
});

const getById = rescue(async function (request, response, next) {
  const { id } = request.params;

  const book = await BookService.getById(id);

  if (book.error) {
    return next(book.error);
  }

  return response.status(200).json(book);
});

const create = rescue(async function (request, response, next) {
  const { body } = request;

  const book = await BookService.create(body);

  if (book.error) {
    return next(book.error);
  }

  return response.status(200).json({ message: 'Livro criado com sucesso', book });
});

module.exports = { getAll, getById, create };
