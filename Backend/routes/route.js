const express = require('express');
const { getAllOrder, createOrder, deleteOrder, updateOrder} = require('../controllers/controller');


const router = express.Router();

router.get("/order", getAllOrder);
router.post("/order", createOrder);
router.delete("/order/:id", deleteOrder);
router.put("/order/:id", updateOrder);
module.exports = router;
