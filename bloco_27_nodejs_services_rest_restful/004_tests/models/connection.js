const { MongoClient } = require('mongodb');

const MONGO_DB_HOST = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'model_example';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let schema = null;

async function getConnection() {
  if (schema) {
    return Promise.resolve(schema);
  }

  const client = await MongoClient.connect(MONGO_DB_HOST, OPTIONS)
    .then((conn) => conn.db(DB_NAME))
    .then((dbSchema) => {
      schema = dbSchema;

      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

  return client;
}

module.exports = { getConnection };
