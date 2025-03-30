exports.addToCart = (req, res) => {
    const { product } = req.body;
    res.status(200).json({ message: "Termék hozzáadva a kosárhoz", product });
  };
  
  exports.placeOrder = (req, res) => {
    const { cart } = req.body;
    res.status(200).json({ message: "Rendelés leadva", cart });
  };
  