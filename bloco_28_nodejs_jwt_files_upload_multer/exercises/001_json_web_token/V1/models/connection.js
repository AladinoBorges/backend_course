const mongoClient = require("mongodb").MongoClient;

const { DB_URL, DB_NAME } = process.env;

async function connection() {
  return mongoClient
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = connection;
