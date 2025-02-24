const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM user WHERE email = ?';

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Belső szerverhiba' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Helytelen email vagy jelszó' });
    }

    const user = results[0];
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Helytelen email vagy jelszó' });
    }

    const token = 'dummy-token'; // Simplified token generation
    res.status(200).json({ message: 'Sikeres bejelentkezés', token, username: user.username });
  });
};
