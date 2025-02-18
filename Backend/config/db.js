const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Hiba történt a kapcsolat létrehozása során:', err);
    return;
  }
  console.log('Sikeres kapcsolat az adatbázishoz!');
});

module.exports = db;
