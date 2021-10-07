const connection = require('./MySQLConnection');

function formatAuthorData({ id, firstName, middleName, lastName }) {
  const fullName = [firstName, middleName, lastName].filter((name) => name).join(' ');

  return { id, firstName, middleName, lastName, fullName };
}

function serialize({ id, first_name, middle_name, last_name }) {
  return {
    id,
    firstName: first_name,
    middleName: middle_name,
    lastName: last_name,
  };
}

async function getAll() {
  const QUERY = 'SELECT id, first_name, middle_name, last_name FROM model_example.authors;';

  const [authors] = await connection.execute(QUERY);

  return authors.map(serialize).map(formatAuthorData);
}

async function getById(id) {
  const QUERY = 'SELECT * FROM model_example.authors WHERE id = ?;';

  const [author] = await connection.execute(QUERY, [id]);

  if (author.length === 0) {
    return null;
  }

  return author.map(serialize).map(formatAuthorData);
}

function isValid({ firstName, middleName, lastName, birthday, nationality }) {
  if (!firstName && typeof firstName !== 'string') {
    return false;
  }
  if (middleName && typeof middleName !== 'string') {
    return false;
  }
  if (!lastName && typeof lastName !== 'string') {
    return false;
  }
  if (birthday && typeof birthday !== 'string') {
    return false;
  }
  if (nationality && typeof nationality !== 'string') {
    return false;
  }

  return true;
}

async function create({ firstName, middleName, lastName, birthday, nationality }) {
  const QUERY =
    'INSERT INTO model_example.authors (first_name, middle_name, last_name, birthday, nationality) VALUES(?, ?, ?, ?, ?);';

  const isValidData = isValid({ firstName, middleName, lastName, nationality });

  if (!isValidData) {
    return false;
  }

  const newAuthor = await connection.execute(QUERY, [
    firstName,
    middleName,
    lastName,
    birthday,
    nationality,
  ]);

  return newAuthor;
}

module.exports = { getAll, getById, create };
