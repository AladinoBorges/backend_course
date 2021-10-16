const MovieService = require('../services/MovieService');

async function create(request, response, _next) {
  const { title, directedBy, releaseYear } = request.body;

  const movie = await MovieService.create({ title, directedBy, releaseYear });

  if (!movie) {
    return response.status(400).json({ message: 'Dados inválidos' });
  }

  return response.status(201).json({ message: 'Filme criado com sucesso!' });
}

module.exports = { create };
