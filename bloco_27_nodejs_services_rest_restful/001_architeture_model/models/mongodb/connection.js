const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://localhost:27017';
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

function connection() {
  const client = db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS).then((conn) => {
        db = conn.db('model_example');

        return db;
      });

  return client;
}

module.exports = connection;
