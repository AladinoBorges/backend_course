const MoviesServices = require('../services/MoviesServices');

async function getAll(_request, response) {
  const movies = await MoviesServices.getAll();

  return response.status(200).json(movies);
}

async function create(request, response) {
  const { title, directedBy, releaseYear } = request.body;

  const movie = await MoviesServices.create({ title, directedBy, releaseYear });

  if (!movie) {
    return response.status(400).json({ message: 'Dados inválidos' });
  } else {
    return response.status(201).json({ message: 'Filme criado com sucesso!' });
  }
}

module.exports = { create, getAll };
