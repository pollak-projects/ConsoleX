// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add-to-cart', cartController.addToCart);
router.post('/place-order', cartController.placeOrder);

module.exports = router;
