const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Ha a frontend másik porton fut, szükséges lehet CORS kezelés
const app = express();
const route = require('./routes/route')

app.use('/api/order', route);

// CORS beállítása, hogy a frontend kommunikálhasson a szerverrel
app.use(cors());

// Middlewares
app.use(express.json());

// MySQL kapcsolat beállítása
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // vagy a jelszavad
  database: 'vizsgaremek', // Az adatbázis neve
  port: 3306, // Az alapértelmezett port, ha más portot használsz, akkor módosítani kell
});

// Kapcsolódás a MySQL adatbázishoz
db.connect((err) => {
  if (err) {
    console.error('Hiba a MySQL kapcsolódásnál: ' + err.stack);
    return;
  }
  console.log('Kapcsolódva az adatbázishoz');
});

// API végpont a termékek lekéréséhez
app.get('/api/product', (req, res) => {
  const sql = 'SELECT * FROM products'; // Feltételezve, hogy a tábla neve 'products'

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Hiba történt a lekérdezés során: ', err);
      return res.status(500).json({ message: 'Hiba történt a lekérdezés során' });
    }
    res.json(results);
  });
});

app.get('/api/order', (req, res) => {
  const sql = 'SELECT * FROM order'; // Feltételezve, hogy a tábla neve 'products'

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Hiba történt a lekérdezés során: ', err);
      return res.status(500).json({ message: 'Hiba történt a lekérdezés során' });
    }
    res.json(results);
  });
});

// Szerver indítása
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Szerver fut a ${PORT}-es porton`);
});
