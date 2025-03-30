const db = require('../config/db');

exports.getUserDetails = (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  const query = 'SELECT user_id, username, email FROM users WHERE user_id = ?';

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result[0];
    return res.status(200).json(user);
  });
};
