const db = require('../config/db');

exports.createOrder = (req, res) => {
  const { userDetails, products } = req.body;
  const userId = userDetails.user_id ? userDetails.user_id : null;

  const insertOrderQuery = `
  INSERT INTO orders (user_id, name, address, payment_method, order_date)
  VALUES (?, ?, ?, ?, NOW())`;

  db.query(
    insertOrderQuery,
    [
      userId,
      userDetails.name,
      userDetails.address,
      userDetails.paymentMethod,
    ],
    (orderErr, orderResult) => {
      if (orderErr) {
        console.error('Hiba a rendelés mentésekor:', orderErr);
        return res.status(500).json({ message: 'Nem sikerült menteni a rendelést.' });
      }

      const orderId = orderResult.insertId;

      const insertOrderItemsQuery = `
        INSERT INTO order_items (order_id, product_id, quantity)
        VALUES ?`;

      const orderItemsData = products.map((product) => [
        orderId,
        product.product_id,
        product.quantity,
      ]);

      db.query(insertOrderItemsQuery, [orderItemsData], (orderItemsErr) => {
        if (orderItemsErr) {
          console.error('Hiba a rendelés tételeinek mentésekor:', orderItemsErr);
          return res.status(500).json({ message: 'Nem sikerült menteni a rendelés tételeit.' });
        }

        res.status(200).json({ message: 'A rendelés sikeresen leadva!' });
      });
    }
  );
};
