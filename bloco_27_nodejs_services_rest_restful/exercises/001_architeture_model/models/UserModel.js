const { ObjectId } = require('mongodb');

const { getConnection } = require('./MongoConnection');

const COLLECTION = 'users';

async function getAll() {
  const users = await getConnection()
    .then((db) => db.collection(COLLECTION).find().toArray())
    .then((allUsers) =>
      allUsers.map(({ _id, firstName, lastName, email }) => ({
        id: _id,
        fullName: `${firstName} ${lastName}`,
        email,
      })),
    );

  return users;
}

async function getById(id) {
  const user = await getConnection().then((db) =>
    db.collection(COLLECTION).findOne({ _id: new ObjectId(id) }),
  );

  if (!user) {
    return null;
  }

  const { _id, firstName, lastName, email } = await user;

  return [
    {
      id: _id,
      fullName: `${firstName} ${lastName}`,
      email,
    },
  ];
}

async function create({ firstName, lastName, email, password }) {
  const newUser = await getConnection()
    .then((db) => db.collection(COLLECTION).insertOne({ firstName, lastName, email, password }))
    .then(({ insertedId }) => ({ id: insertedId, firstName, lastName, email }));

  return newUser;
}

module.exports = { getAll, getById, create };
