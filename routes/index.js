const express = require('express');
const app = express();

app.use('/products',require('./products/productRoute'))

module.exports = app;