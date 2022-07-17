//getting msql2 and storing it into mysql
const mysql = require('mysql2');
//establising the connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sandhu89@',
  database: 'election'
});


module.exports = db;
