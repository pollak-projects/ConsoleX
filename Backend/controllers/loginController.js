const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.loginUser = (req, res) => {
  const { usernameOrEmail, password } = req.body;

  const emailRegex = /\S+@\S+\.\S+/;
  const query = emailRegex.test(usernameOrEmail)
    ? 'SELECT * FROM user WHERE email = ?'
    : 'SELECT * FROM user WHERE username = ?';

  db.query(query, [usernameOrEmail], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Belső szerverhiba' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Helytelen felhasználónév/email vagy jelszó' });
    }

    const user = results[0];
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Helytelen felhasználónév/email vagy jelszó' });
    }

    const token = 'dummy-token';
    res.status(200).json({
      message: 'Sikeres bejelentkezés',
      token,
      username: user.username,
      role: user.role,
    });
  });
};


