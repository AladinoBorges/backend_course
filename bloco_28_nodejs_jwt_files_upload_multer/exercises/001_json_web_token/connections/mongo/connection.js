const mongoClient = require('mongodb').MongoClient;

const { DB_URL } = process.env;

const getConnection = () =>
  mongoClient
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('jwt_exercise'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = { getConnection };
