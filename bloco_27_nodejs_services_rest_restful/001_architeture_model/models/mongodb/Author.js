const connection = require('./connection.js');

function fullnameCreator({ id, firstName, middleName, lastName }) {
  const fullName = [firstName, middleName, lastName].filter((name) => name).join(' ');

  const newAuthor = {
    id,
    firstName,
    middleName,
    lastName,
    fullName,
  };

  return newAuthor;
}

function serializeSnakeToCamelCase(authorData) {
  const serializeData = {
    id: authorData.id,
    firstName: authorData.first_name,
    middleName: authorData.middle_name,
    lastName: authorData.last_name,
    nationality: authorData.nationality,
  };

  return serializeData;
}

async function getAll() {
  const allAuthors = connection()
    .then((db) => db.collection('authors').find().toArray())
    .then((authors) => {
      const authorsData = authors.map(({ _id, firstName, middleName, lastName }) =>
        fullnameCreator({
          id: _id,
          firstName,
          middleName,
          lastName,
        }),
      );

      return authorsData;
    });

  return allAuthors;
}

async function findById(targetId) {
  const query = 'SELECT id, first_name, middle_name, last_name FROM authors WHERE id = ?';

  const [author] = await connection.execute(query, [targetId]);

  if (author.length > 0) {
    const serializedData = author.map(serializeSnakeToCamelCase)[0];
    const insertedAuthorFullname = fullnameCreator(serializedData);

    return insertedAuthorFullname;
  } else {
    return null;
  }
}

function dataIsValid(firstName, middleName, lastName, nationality) {
  if (!firstName || typeof firstName !== 'string') return false;
  if (!lastName || typeof lastName !== 'string') return false;
  if (middleName && typeof middleName !== 'string') return false;
  if (nationality && typeof nationality !== 'string') return false;

  return true;
}

async function create(firstName, middleName, lastName, birthday, nationality) {
  const query =
    'INSERT INTO authors (first_name, middle_name, last_name, birthday, nationality) VALUES (?, ?, ?, ?, ?)';

  connection.execute(query, [firstName, middleName, lastName, birthday, nationality]);
}

module.exports = { getAll, findById, dataIsValid, create };
