const express = require('express');
const { findById, find, save, deleteProduct } = require('../../controllers/product.controller');
const validateProduct = require('../../middleware/product');
const app = express();

app.get('/getProduct',findById);
app.get('/getAllProduct',validateProduct.validateList,find);
app.post('/createProduct',validateProduct.validateProduct,save);
app.post('/deleteProduct',deleteProduct);

module.exports = app;