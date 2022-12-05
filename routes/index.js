const express = require('express');
const app = express();

app.use('/products',require('./products/productRoute'))
app.use('/cart',require('./cart/cartRoute'));

module.exports = app;