const { ObjectId } = require('mongodb');

const { getConnection } = require('./mongoDBConnection');

const COLLECTION = 'authors';

function formatAuthorData({ id, firstName, middleName, lastName }) {
  const fullName = [firstName, middleName, lastName].filter((name) => name).join(' ');

  return { id, firstName, middleName, lastName, fullName };
}

async function getAll() {
  const authors = await getConnection()
    .then((db) => db.collection(COLLECTION).find().toArray())
    .then((authors) =>
      authors.map(({ _id, firstName, middleName, lastName }) => {
        return formatAuthorData({
          id: _id,
          firstName,
          middleName,
          lastName,
        });
      }),
    );

  return authors;
}

async function getById(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const author = await getConnection().then((db) =>
    db.collection(COLLECTION).findOne({ _id: new ObjectId(id) }),
  );

  if (!author) {
    return null;
  }

  const { firstName, middleName, lastName } = author;

  return formatAuthorData({ id, firstName, middleName, lastName });
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
  const isValidData = isValid({ firstName, middleName, lastName, nationality });

  if (!isValidData) {
    return false;
  }

  const newAuthor = await getConnection()
    .then((db) =>
      db
        .collection(COLLECTION)
        .insertOne({ firstName, middleName, lastName, birthday, nationality }),
    )
    .then(({ insertedId }) =>
      formatAuthorData({ id: insertedId, firstName, middleName, lastName }),
    );

  return newAuthor;
}

module.exports = { getAll, getById, create };
