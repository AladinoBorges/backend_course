const mongoConnection = require('./connection');

async function getAll() {
  const moviesCollection = await mongoConnection
    .getConnection()
    .then((db) => db.collection('movies'));

  const movies = await moviesCollection.find().toArray();

  const formattedResults = movies.map(({ _id, ...movieData }) => ({
    id: _id,
    ...movieData,
  }));

  return formattedResults;
}

async function create({ title, directedBy, releaseYear }) {
  const moviesCollection = await mongoConnection
    .getConnection()
    .then((db) => db.collection('movies'));

  const { insertedId: id } = await moviesCollection.insertOne({ title, directedBy, releaseYear });

  return { id, title, directedBy, releaseYear };
}

module.exports = { create, getAll };
