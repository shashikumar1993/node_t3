const express = require('express');
const cart = require('../../controllers/cart.controller');
const cartMid = require('../../middleware/cart');
const app = express();

app.post('/saveToCart',cartMid.cartValidator,cartMid.validateBearerToken,cartMid.validateItem,cart.saveToCart);
app.get('/placeOrder',cartMid.validateBearerToken,cart.placeOrder);

app.get('/processPayment',cartMid.validatePayment,cart.startPayment);

// app.post('/verifyPayment',async(req,res) => {
//     console.log(req);
//     res.json(req.body);
// })

app.post('/verifyPayment',cart.verifyPayment);

app.post('/cancelPayment',async(req,res) => {
    console.log(req);
    res.json(req.body);
})

app.get('/viewInvoice',cart.getOrderInvoice);

app.get('/viewInvoiceXlsx',cart.orderList);

module.exports = app;