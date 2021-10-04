const MoviesService = require('../services/moviesService');

async function create(request, response) {
  const { title, directedBy, releaseYear } = request.body;

  const movie = await MoviesService.create({ title, directedBy, releaseYear });

  if (!movie) {
    return response.status(400).json({ message: 'Dados inválidos' });
  } else {
    return response.status(201).json({ message: 'Filme criado com sucesso!' });
  }
}

module.exports = { create };
