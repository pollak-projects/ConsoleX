const db = require('../config/db');
const bcrypt = require('bcrypt'); // For password hashing

exports.registerUser = (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

  db.query(query, [username, email, hashedPassword], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Belső szerverhiba' });
    }
    res.status(201).json({ message: 'Sikeres regisztráció!' });
  });
};
