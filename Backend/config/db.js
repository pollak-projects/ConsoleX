const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'vizsgaremek',
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return process.exit(1);
  }
  console.log('Connected to the database');
});

module.exports = db;
