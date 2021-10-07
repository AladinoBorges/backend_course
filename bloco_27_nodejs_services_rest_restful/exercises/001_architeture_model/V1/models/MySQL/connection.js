const mysql = require("mysql2/promise");

const OPTIONS = {
  user: "root",
  password: "1548792063_a.B",
  host: "localhost",
  database: "users_crud",
};

const connection = mysql.createPool(OPTIONS);

module.exports = connection;
