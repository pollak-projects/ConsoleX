const db = require('../config/db');

const getAllProducts = (req, res) => {
  const sql = 'SELECT * FROM products';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching products: ', err);
      return res.status(500).json({ error: 'Error fetching products!' });
    }
    res.status(200).json(results);
  });
};

const getAllOrders = (req, res) => {
  const sql = `
    SELECT o.order_id, o.order_date, o.total_price, o.status, u.username
    FROM \`order\` o
    JOIN \`user\` u ON o.user_id = u.user_id
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching orders: ', err);
      return res.status(500).json({ error: 'Error fetching orders!' });
    }
    res.status(200).json(results);
  });
};

const createOrder = (req, res) => {
  const { user_id, order_date, total_price, status } = req.body;

  if (!user_id || !order_date || !total_price || !status) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  const sql = `
    INSERT INTO \`order\` (user_id, order_date, total_price, status)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [user_id, order_date, total_price, status], (err, result) => {
    if (err) {
      console.error('Error creating order: ', err);
      return res.status(500).json({ error: 'Error creating order' });
    }
    res.status(201).json({ message: 'Order created successfully', order_id: result.insertId });
  });
};

const addOrderItems = (req, res) => {
  const { order_id, product_id, quantity, unit_price } = req.body;

  if (!order_id || !product_id || !quantity || !unit_price) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  const sql = `
    INSERT INTO \`order_item\` (order_id, product_id, quantity, unit_price)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [order_id, product_id, quantity, unit_price], (err, result) => {
    if (err) {
      console.error('Error adding order item: ', err);
      return res.status(500).json({ error: 'Error adding order item' });
    }
    res.status(201).json({ message: 'Order item added successfully' });
  });
};

module.exports = {
  getAllProducts,
  getAllOrders,
  createOrder,
  addOrderItems,
};
