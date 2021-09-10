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

async function findById(bookId) {
  const query = 'SELECT * FROM books WHERE id = ?';

  const [book] = await connection.execute(query, [bookId]);

  if (book.length > 0) {
    const serializedData = book.map(serializeSnakeToCamelCase)[0];

    return serializedData;
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
