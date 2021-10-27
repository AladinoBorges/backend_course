const MongoConnection = require('../connections/mongo/connection');

const COLLECTION = 'users';

async function getByUsername(username) {
  try {
    const user = await MongoConnection.getConnection()
      .then((db) => db.collection(COLLECTION).findOne({ username }));

    return { user };
  } catch (error) {
    return { error };
  }
}

module.exports = { getByUsername };
