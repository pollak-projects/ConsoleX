const express = require("express");
const router = require('./router/router');

const app = express();
require('dotenv').config();

app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 8000;

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`)
});
