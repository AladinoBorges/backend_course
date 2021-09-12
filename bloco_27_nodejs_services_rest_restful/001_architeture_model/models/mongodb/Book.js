const { ObjectId } = require('mongodb');

const connection = require('./connection.js');
const Author = require('./Author.js');

function serializeSnakeToCamelCase(bookData) {
  const serializeData = {
    id: bookData.id,
    title: bookData.title,
    authorId: bookData.author_id,
  };

  return serializeData;
}

async function getAll() {
  const allBooks = connection().then((db) => db.collection('books').find().toArray());

  return allBooks;
}

async function searchByAuthorId(targetAuthorId) {
  const allBooks = connection().then((db) =>
    db
      .collection('books')
      .find({ authorId: Number(targetAuthorId) })
      .toArray(),
  );

  return allBooks;
}

async function findById(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const bookData = await connection().then((db) =>
    db.collection('books').findOne({ _id: new ObjectId(id) }),
  );

  if (bookData) {
    return bookData;
  } else {
    return null;
  }
}

async function dataIsValid(title, authorId) {
  const authorIdExistence = await Author.findById(authorId);

  if (!title || typeof title !== 'string' || title.length < 3) return false;
  if (!authorId || typeof authorId !== 'number' || !authorIdExistence) return false;

  return true;
}

async function create(title, authorId) {
  const query = 'INSERT INTO books (title, author_id) VALUES (?, ?)';

  connection.execute(query, [title, authorId]);
}

module.exports = { getAll, searchByAuthorId, findById, dataIsValid, create };
