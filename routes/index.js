const express = require('express');
const app = express();

app.use('/products',require('./products/productRoute'))
app.use('/cart',require('./cart/cartRoute'));
app.use('/user',require('../routes/user/user.route'))

module.exports = app;