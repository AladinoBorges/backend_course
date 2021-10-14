const mongoConnection = require('../connections/connectionMongo');

const COLLECTION = 'movies';

async function create({ title, directedBy, releaseYear }) {
  const movies = await mongoConnection.getConnection().then((db) => db.collection(COLLECTION));

  const { insertedId: id } = await movies.insertOne({ title, directedBy, releaseYear });

  return { id };
}

module.exports = { create };
