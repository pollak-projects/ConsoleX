const db = require('../config/db');

exports.registerUser = (req, res) => {
  const { username, email, password } = req.body;
  const query = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';

  db.query(query, [username, email, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Belső szerverhiba' });
    }
    res.status(201).json({ message: 'Sikeres regisztráció!' });
  });
};
