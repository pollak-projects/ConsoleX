exports.addToCart = (req, res) => {
    const { product } = req.body;
    res.status(200).json({ message: "Product added to cart", product });
  };
  
  exports.placeOrder = (req, res) => {
    const { cart } = req.body;
    res.status(200).json({ message: "Order placed", cart });
  };
  