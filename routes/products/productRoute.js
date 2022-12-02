const express = require('express');
const { findById, find, save } = require('../../controllers/product.controller');
const validateProduct = require('../../middleware/product');
const app = express();

app.get('/getProduct',findById);
app.get('/getAllProduct',find);
app.post('/createProduct',validateProduct.validateProduct,save);

module.exports = app;