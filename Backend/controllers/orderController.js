const db = require('../config/db');

exports.createOrder = (req, res) => {
  const { userDetails, products } = req.body;
  const userId = userDetails.user_id || null;

  const insertOrderQuery = `
  INSERT INTO orders (user_id, name, address, payment_method, order_date)
  VALUES (?, ?, ?, ?, NOW())`;

  db.query(
    insertOrderQuery,
    [userId, userDetails.name, userDetails.address, userDetails.paymentMethod],
    (orderErr, orderResult) => {
      if (orderErr) {
        console.error("Hiba a rendelés mentésekor:", orderErr);
        return res.status(500).json({ message: "Nem sikerült menteni a rendelést." });
      }

      const orderId = orderResult.insertId;

      const insertOrderItemsQuery = `
        INSERT INTO order_items (order_id, product_id, quantity)
        VALUES ?`;

      const orderItemsData = products.map((product) => [orderId, product.product_id, product.quantity]);

      db.query(insertOrderItemsQuery, [orderItemsData], (orderItemsErr) => {
        if (orderItemsErr) {
          console.error("Hiba a rendelés tételeinek mentésekor:", orderItemsErr);
          return res.status(500).json({ message: "Nem sikerült menteni a rendelés tételeit." });
        }

        res.status(200).json({ 
          message: "A rendelés sikeresen leadva!", 
          orderId 
        });
      });
    }
  );
};

exports.getUserOrders = (req, res) => {
  const userId = req.params.userId;

  const query = `
      SELECT o.order_id, o.name, o.address, o.payment_method, o.order_date,
             oi.quantity, p.name AS product_name, p.price
      FROM orders o
      JOIN order_items oi ON o.order_id = oi.order_id
      JOIN products p ON oi.product_id = p.product_id
      WHERE o.user_id = ?
      ORDER BY o.order_date DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Hiba a rendelési adatok lekérésekor:", err);
      return res.status(500).json({ message: "Hiba történt a rendelési adatok lekérésekor." });
    }

    const orders = results.reduce((acc, row) => {
      const { order_id, name, address, payment_method, order_date, quantity, product_name, price } = row;

      if (!acc[order_id]) {
        acc[order_id] = {
          order_id,
          name,
          address,
          payment_method,
          order_date,
          total_price: 0,
          items: [],
          shippingMethod: null,
          shippingCost: 0
        };
      }

      acc[order_id].items.push({ product_name, quantity, price });
      acc[order_id].total_price += quantity * price;

      return acc;
    }, {});

    res.status(200).json(Object.values(orders));
  });
};



exports.getUserOrders = (req, res) => {
  const userId = req.params.userId;

  const query = `
      SELECT o.order_id, o.name, o.address, o.payment_method, o.order_date,
             oi.quantity, p.name AS product_name, p.price
      FROM orders o
      JOIN order_items oi ON o.order_id = oi.order_id
      JOIN products p ON oi.product_id = p.product_id
      WHERE o.user_id = ?
      ORDER BY o.order_date DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Hiba a rendelési adatok lekérésekor:", err);
      return res.status(500).json({ message: "Hiba történt a rendelési adatok lekérésekor." });
    }

    const orders = results.reduce((acc, row) => {
      const { order_id, name, address, payment_method, order_date, shipping_method, shipping_cost, quantity, product_name, price } = row;

      if (!acc[order_id]) {
        acc[order_id] = {
          order_id,
          name,
          address,
          payment_method,
          order_date,
          shipping_method,
          shipping_cost,
          total_price: 0,
          items: []
        };
      }

      acc[order_id].items.push({ product_name, quantity, price });
      acc[order_id].total_price += quantity * price;

      return acc;
    }, {});

    res.status(200).json(Object.values(orders));
  });
};




exports.deleteOrder = (req, res) => {
  const orderId = req.params.orderId;

  const query = `DELETE FROM orders WHERE order_id = ?`;

  db.query(query, [orderId], (err, result) => {
      if (err) {
          console.error('Hiba a rendelés törlésekor:', err);
          return res.status(500).json({ message: 'Hiba történt a rendelés törlésekor.' });
      }

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'A rendelés nem található vagy már törölve lett.' });
      }

      res.status(200).json({ message: 'A rendelés sikeresen törölve.' });
  });
};

