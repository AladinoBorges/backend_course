const mysql = require("mysql2/promise");

const { USER, PASSWORD, DB_HOST, DB_NAME } = process.env;

const connection = mysql.createPool({
  user: USER,
  password: PASSWORD,
  host: DB_HOST,
  database: DB_NAME,
});

module.exports = connection;
