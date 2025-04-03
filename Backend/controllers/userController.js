const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.updatePassword = (req, res) => {
  const { user_id, newPassword } = req.body;

  if (!user_id || !newPassword) {
    return res.status(400).json({ message: 'Hiányzó adat!' });
  }

  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  const query = 'UPDATE users SET password = ? WHERE user_id = ?';
  
  db.query(query, [hashedPassword, user_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Hiba történt a jelszó frissítésekor' });
    }
    
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Felhasználó nem található' });
    }
    
    res.status(200).json({ message: 'Jelszó sikeresen módosítva' });
  });
};
