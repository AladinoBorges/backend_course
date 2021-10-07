const mysql = require("mysql2/promise");

const { USER, HOST, PASSWORD, DB_NAME } = process.env;

const connection = mysql.createPool({
  user: USER,
  password: PASSWORD,
  host: HOST,
  database: DB_NAME,
});

module.exports = connection;
