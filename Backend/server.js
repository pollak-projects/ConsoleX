const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoute');
const orderRoutes = require('./routes/orderRoute');
const registerRoutes = require('./routes/registerRoute'); 
const loginRoutes = require('./routes/loginRoute'); 

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', registerRoutes); 
app.use('/api', loginRoutes);

app.get('/', (req, res) => {
  res.send('Backend szerver működik!');
});

app.listen(port, () => {
  console.log(`Szerver fut a http://localhost:${port}`);
});
