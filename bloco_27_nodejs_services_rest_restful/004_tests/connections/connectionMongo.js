const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { MONGO_URL, DB_NAME } = process.env;

let db = null;

function getConnection() {
  if (db) {
    return Promise.resolve(db);
  }

  return MongoClient.connect(MONGO_URL, OPTIONS)
    .then((conn) => conn.db(DB_NAME))
    .then((dbSchema) => {
      db = dbSchema;

      return db;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { getConnection };
