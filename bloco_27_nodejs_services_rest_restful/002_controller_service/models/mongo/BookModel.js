const { ObjectId } = require('mongodb');

const { getConnection } = require('./mongoDBConnection');

const COLLECTION = 'books';

async function getAll() {
  const books = await getConnection().then((db) => db.collection(COLLECTION).find().toArray());

  return books;
}

async function getById(id) {
  const book = await getConnection().then((db) =>
    db.collection(COLLECTION).findOne({ _id: new ObjectId(id) }),
  );

  return book;
}

async function findByTitleAndAuthorId({ title, authorId }) {
  const book = getConnection().then((db) => db.collection(COLLECTION).findOne({ title, authorId }));

  return book;
}

async function create({ title, authorId }) {
  const newBook = await getConnection()
    .then((db) => db.collection(COLLECTION).insertOne({ title, authorId }))
    .then(({ insertedId }) => ({ id: insertedId, title, authorId }));

  return newBook;
}

module.exports = { getAll, getById, findByTitleAndAuthorId, create };
