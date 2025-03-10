// controllers/UserController.js
const jwt = require('jsonwebtoken');
const users = [
  { id: 1, name: 'Teszt Felhasználó', email: 'test@test.com', password: 'password' }
];

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Érvénytelen email vagy jelszó.' });
  }

  // Generate a token
  const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });
  res.json({ message: 'Sikeres bejelentkezés.', token, username: user.name });
};

exports.getProfile = (req, res) => {
  // Assuming the token is valid and decoded
  const user = users.find(user => user.id === req.user.id);

  if (!user) {
    return res.status(404).json({ message: 'Felhasználó nem található.' });
  }

  res.json({ id: user.id, name: user.name, email: user.email });
};
