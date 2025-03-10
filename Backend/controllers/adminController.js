const db = require('../config/db');

exports.addProduct = (req, res) => {
  const { name, price, image, category } = req.body;
  const query = 'INSERT INTO products (name, price, image, category) VALUES (?, ?, ?, ?)';
  db.query(query, [name, price, image, category], (err, result) => {
    if (err) {
      console.error('Hiba történt a termék hozzáadásakor:', err);
      res.status(500).send('Hiba történt a termék hozzáadásakor');
      return;
    }
    res.send('Product added successfully');
  });
};

exports.getProducts = (req, res) => {
  const sqlQuery = 'SELECT * FROM products';
  
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Hiba a lekérdezés során:', err);
      return res.status(500).json({ message: 'Hiba történt a termékek lekérésekor' });
    }
    res.json({ products: results });
  });
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM products WHERE product_id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Hiba történt a termék törlésekor:', err);
      res.status(500).send('Hiba történt a termék törlésekor');
      return;
    }
    res.send('Termék sikeresen törölve');
  });
};
