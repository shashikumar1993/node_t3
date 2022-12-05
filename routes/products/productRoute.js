const express = require('express');
const { findById, find, save, deleteProduct ,uploadImage } = require('../../controllers/product.controller');
const validateProduct = require('../../middleware/product');

const app = express();


app.get('/getProduct',findById);
app.get('/getAllProduct',validateProduct.validateList,find);
app.post('/createProduct',validateProduct.validateProduct,save);
app.post('/deleteProduct',deleteProduct);

//app.post('/uploadImage',upload.single('file'),uploadImage)
app.post('/uploadImage',(req,res) => {
    res.send(req.file);
})

module.exports = app;