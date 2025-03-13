const db = require('../config/db');

exports.getAllProducts = (req, res) => {
  const sqlQuery = 'SELECT * FROM products';
  
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Hiba a lekérdezés során:', err);
      return res.status(500).json({ message: 'Hiba történt a termékek lekérésekor' });
    }
    res.json({ products: results });
  });
};
