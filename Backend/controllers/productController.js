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


exports.getAllCategories = (req, res) => {
  const sqlQuery = 'SELECT id, category_name FROM category';
  
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Hiba a kategóriák lekérésekor:', err);
      return res.status(500).json({ message: 'Hiba történt a kategóriák lekérésekor' });
    }
    res.json({ categories: results });
  });
};
