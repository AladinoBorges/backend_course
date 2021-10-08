const rescue = require('express-rescue');

const AuthorService = require('../services/AuthorService');

const getAll = rescue(async (_request, response, _next) => {
  const authors = await AuthorService.getAll();

  return response.status(200).json(authors);
});

const getById = rescue(async (request, response, next) => {
  const { id } = request.params;

  const author = await AuthorService.getById(id);

  if (author.error) {
    return next(author.error);
  }

  return response.status(200).json(author);
});

const create = rescue(async (request, response, next) => {
  const { body } = request;

  const author = await AuthorService.create(body);

  if (author.error) {
    return next(author.error);
  }

  return response.status(200).json({ message: 'Autor criado com sucesso', author });
});

module.exports = { getAll, getById, create };
