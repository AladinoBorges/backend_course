const MoviesModel = require('../models/MoviesModel');

function isValid(title, directedBy, releaseYear) {
  if (!title || typeof title !== 'string') return false;
  if (!directedBy || typeof directedBy !== 'string') return false;
  if (!releaseYear || typeof releaseYear !== 'number') return false;

  return true;
}

function formatData(data) {
  const { id, title, directedBy, releaseYear } = data;

  return { id, title, directedBy, releaseYear };
}

async function getAll() {
  const movies = await MoviesModel.getAll();

  const formattedData = await movies.map(formatData);

  return formattedData;
}

async function create({ title, directedBy, releaseYear }) {
  const isMovieDataValid = isValid(title, directedBy, releaseYear);

  if (!isMovieDataValid) {
    return false;
  }

  const { id } = await MoviesModel.create({ title, directedBy, releaseYear });

  return { id };
}

module.exports = { create, getAll };
