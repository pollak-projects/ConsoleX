const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoute = require('./routes/productRoute');
const registerRoute = require('./routes/registerRoute'); 
const loginRoute = require('./routes/loginRoute'); 
const adminRoute = require('./routes/adminRoute'); 
const orderRoute = require('./routes/orderRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/api', productRoute);
app.use('/api', registerRoute); 
app.use('/api', loginRoute);
app.use('/api', adminRoute);
app.use('/api', orderRoute);
app.use('/api', categoryRoute);
app.use('/api', userRoute);

app.get('/', (req, res) => {
  res.send('Backend szerver működik!');
});

app.listen(port, () => {
  console.log(`Szerver fut a http://localhost:${port}`);
});

