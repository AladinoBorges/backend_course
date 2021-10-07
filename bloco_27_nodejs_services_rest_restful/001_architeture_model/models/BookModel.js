const connection = require('./MySQLConnection');
const AuthorModel = require('./AuthorModel');

function serialize({ id, title, author_id }) {
  return {
    id,
    title,
    authorId: author_id
  };
}

async function getAll() {
  const QUERY = 'SELECT id, title, author_id FROM model_example.books;';

  const [books] = await connection.execute(QUERY);

  return books.map(serialize);
}

async function getById(id) {
  const QUERY = 'SELECT * FROM model_example.books WHERE id = ?;';

  const [book] = await connection.execute(QUERY, [id]);

  if (book.length === 0) {
    return null;
  }

  return book.map(serialize);
}

async function isValid({ title, authorId }) {
  const authorExists = await AuthorModel.getById(authorId);

  if (!title || typeof title !== 'string') { return false; }
  if (!authorId || typeof authorId !== 'number' || !authorExists) { return false; }

  return true;
}

async function create({ title, authorId }) {
  const QUERY = 'INSERT INTO model_example.books (title, author_id) VALUES(?, ?);';

  const isValidData = await isValid({ title, authorId });

  if (!isValidData) {
    return false;
  }

  await connection.execute(QUERY, [title, authorId]);

  return isValidData;
}

module.exports = { getAll, getById, create };
