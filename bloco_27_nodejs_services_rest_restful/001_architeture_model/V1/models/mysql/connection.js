const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  user: 'root',
  password: '1548792063_a.B',
  host: 'localhost',
  database: 'model_example',
});

module.exports = connection;
