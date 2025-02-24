const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('Backend szerver működik!');
});

app.listen(port, () => {
  console.log(`Szerver fut a http://localhost:${port}`);
});
