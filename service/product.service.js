const productModel = require('../models/product.model');


    async function getProduct(id){
        console.log("Product Service");
        return await productModel.findById(id);
    }

    async function getProductList(req,res){
        return await productModel.find();
    }

    async function createProduct(data){
        let product = new productModel(data);
        return product.save();
    }

module.exports = { getProduct, getProductList, createProduct };