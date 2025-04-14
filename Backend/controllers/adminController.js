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
    res.send('Termék sikeresen hozzáadva');
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
  console.log(`Beérkező kérés törlésre, ID: ${id}`);
  const query = 'DELETE FROM products WHERE product_id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Hiba történt a termék törlésekor:', err);
      return res.status(500).send('Hiba történt a termék törlésekor');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Nem található ilyen azonosítójú termék');
    }
    res.send('Termék sikeresen törölve');
  });
};

exports.getAllUsers = (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Hiba a felhasználók lekérése közben:', err);
      return res.status(500).json({ message: 'Sikertelen lekérés' });
    }
    res.json({ users: results });
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
    const deleteQuery = 'DELETE FROM users WHERE user_id = ?';
    db.query(deleteQuery, [id], (err, result) => {
      if (err) {
        return res.status(500).send('Törlés sikertelen');
      }
      res.send('Felhasználó sikeresen törölve');
    });
  };
