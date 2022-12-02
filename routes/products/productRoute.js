const express = require('express');
const { findById, find, save } = require('../../controllers/product.controller');
const app = express();

app.get('/getProduct',findById);
app.get('/getAllProduct',find);
app.post('/createProduct',save);

module.exports = app;