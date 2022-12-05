const express = require('express');
const cart = require('../../controllers/cart.controller');
const cartMid = require('../../middleware/cart');
const app = express();

app.post('/saveToCart',cartMid.cartValidator,cartMid.validateItem,cart.saveToCart);
app.get('/placeOrder',cartMid.orderValidator,cart.placeOrder);

module.exports = app;