const { MongoClient } = require("mongodb");

const MONGO_DB_URL = "mongodb://localhost:27017";
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

function connection() {
  const client = MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => conn.db("model_example"))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

  return client;
}

module.exports = connection;
