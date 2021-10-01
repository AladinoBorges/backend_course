const { getConnection } = require('./connection');

async function create({ title, directedBy, releaseYear }) {
  const moviesCollection = await getConnection().then((db) => db.collection('movies'));

  const { insertedId: id } = await moviesCollection.insertOne({ title, directedBy, releaseYear });

  return { id };
}

module.exports = { create };
