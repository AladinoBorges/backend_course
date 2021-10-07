const { ObjectId } = require('mongodb');

const AuthorModel = require('./AuthorModel');
const { getConnection } = require('./mongoDBConnection');

const COLLECTION = 'books';

function serialize({ id, title, authorId }) {
  return { id, title, authorId };
}

async function getAll() {
  const books = await getConnection()
    .then((db) => db.collection(COLLECTION).find().toArray())
    .then((books) =>
      books.map(({ _id, title, authorId }) => {
        return serialize({ id: _id, title, authorId });
      }),
    );

  return books;
}

async function getById(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const book = await getConnection().then((db) =>
    db.collection(COLLECTION).findOne({ _id: new ObjectId(id) }),
  );

  if (!book) {
    return null;
  }

  const { title, authorId } = book;

  return { id, title, authorId };
}

async function isValid({ title, authorId }) {
  const authorExists = await AuthorModel.getById(authorId);

  if (!title || typeof title !== 'string') {
    return false;
  }
  if (!authorId || !authorExists) {
    return false;
  }

  return true;
}

async function create({ title, authorId }) {
  const isValidData = await isValid({ title, authorId });

  if (!isValidData) {
    return false;
  }

  const newBook = await getConnection()
    .then((db) => db.collection(COLLECTION).insertOne({ title, authorId }))
    .then(({ insertedId }) => ({ id: insertedId, title, authorId }));

  return newBook;
}

module.exports = { getAll, getById, create };
