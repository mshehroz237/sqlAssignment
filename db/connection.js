const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sandhu89@',
  database: 'election'
});

module.exports = db;
