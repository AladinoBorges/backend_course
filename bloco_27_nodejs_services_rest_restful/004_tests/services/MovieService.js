const MovieModel = require('../models/MovieModel');

function isValid({ title, directedBy, releaseYear }) {
  if (!title || typeof title !== 'string') return false;
  if (!directedBy || typeof directedBy !== 'string') return false;
  if (!releaseYear || typeof releaseYear !== 'number') return false;

  return true;
}

async function create(payloadMovie) {
  const isMovieValid = isValid(payloadMovie);

  if (!isMovieValid) {
    return false;
  }

  const { id } = await MovieModel.create(payloadMovie);

  return { id };
}

module.exports = { create };
