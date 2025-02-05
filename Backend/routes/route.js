const express = require('express');
const { getAllOrder, createOrder, deleteOrder, updateOrder} = require('../controllers/controller');


const router = express.Router();
// Végpontok létrehozása
router.get("/order", getAllOrder); // Összes Order lekérdezés
router.post("/order", createOrder); // Új Order rögzítése
router.delete("/order/:id", deleteOrder); // Order törlése
router.put("/order/:id", updateOrder); // Order frissítése
module.exports = router;
