const { ObjectId } = require('mongodb');

const { getConnection } = require('./mongoDBConnection');

const COLLECTION = 'authors';

async function getAll() {
  const authors = await getConnection().then((db) => db.collection(COLLECTION).find().toArray());

  return authors;
}

async function getById(id) {
  const author = await getConnection().then((db) =>
    db.collection(COLLECTION).findOne({ _id: new ObjectId(id) }),
  );

  return author;
}

async function findByName({ firstName, middleName, lastName }) {
  const QUERY = middleName ? { firstName, middleName, lastName } : { firstName, lastName };

  const author = getConnection().then((db) => db.collection(COLLECTION).findOne(QUERY));

  return author;
}

async function create({ firstName, middleName, lastName, birthday, nationality }) {
  const author = await getConnection()
    .then((db) =>
      db
        .collection(COLLECTION)
        .insertOne({ firstName, middleName, lastName, birthday, nationality }),
    )
    .then(({ insertedId }) => ({ id: insertedId, firstName, middleName, lastName }));

  return author;
}

module.exports = { getAll, getById, findByName, create };
