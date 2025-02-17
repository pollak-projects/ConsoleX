const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();

// CORS beállítása
app.use(cors());
app.use(express.json());

// MySQL kapcsolat beállítása
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // A MySQL jelszó
  database: 'vizsgaremek', // Az adatbázis neve
  port: 3306, // Az alapértelmezett port
});

// Kapcsolódás a MySQL adatbázishoz
db.connect((err) => {
  if (err) {
    console.error('Hiba a MySQL kapcsolódásnál: ', err);
    return process.exit(1); // Kilépés hiba esetén
  }
  console.log('Kapcsolódva az adatbázishoz');
});

// Regisztrációs végpont
app.post('/api/register', (req, res) => {
  const { username, password, email } = req.body;

  // Ellenőrizzük, hogy minden adatot megadtak-e
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Minden mezőt ki kell tölteni!' });
  }

  // Ellenőrizzük, hogy a felhasználónév vagy az email már létezik
  const checkUserSql = 'SELECT * FROM users WHERE username = ? OR email = ?';
  db.query(checkUserSql, [username, email], (err, results) => {
    if (err) {
      console.error('Hiba a felhasználó ellenőrzése során: ', err);
      return res.status(500).json({ message: 'Hiba történt a felhasználó ellenőrzése során' });
    }

    // Ha már létezik a felhasználó vagy az email
    if (results.length > 0) {
      return res.status(400).json({ message: 'A felhasználónév vagy email már foglalt!' });
    }

    // A jelszó titkosítása
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Hiba a jelszó titkosítása során', err);
        return res.status(500).json({ message: 'Hiba történt a jelszó titkosítása során' });
      }

      // Felhasználó mentése az adatbázisba
      const sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
      db.query(sql, [username, hashedPassword, email], (err, results) => {
        if (err) {
          console.error('Hiba történt a regisztráció során:', err);
          return res.status(500).json({ message: 'Hiba történt a regisztráció során' });
        }
        res.status(201).json({ message: 'Sikeres regisztráció!' });
      });
    });
  });
});

// Szerver indítása
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Szerver fut a ${PORT}-es porton`);
});
