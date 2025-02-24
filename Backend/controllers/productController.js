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

exports.addProduct = (req, res) => {
  const { name, category, price, image } = req.body;

  const sqlQuery = 'INSERT INTO products (name, category, price, image) VALUES (?, ?, ?, ?)';
  db.query(sqlQuery, [name, category, price, image], (err, result) => {
    if (err) {
      console.error('Hiba a termék hozzáadása során:', err);
      return res.status(500).json({ message: 'Hiba történt a termék hozzáadása során' });
    }
    res.status(201).json({ message: 'Termék sikeresen hozzáadva', productId: result.insertId });
  });
};
