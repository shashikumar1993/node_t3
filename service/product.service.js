const productModel = require('../models/product.model');


    async function getProduct(id){
        console.log("Product Service");
        return await productModel.findById(id);
    }

    async function getProductList(req,res){
        let search = (req.query.search?req.query.search:'')
        let sort = (req.query.sort?req.query.sort:'')
        let order = (req.query.search?req.query.order:'')

        let match = {};
        if( search != '' ){
            match = {
                $match : {
                    name:{$regex:search,$options:'i'}
                }
            }
        }

        let list = [];
        let sortCond = {}
        if( sort != '' ){
            sortCond = { $sort : { [sort] : parseInt(order) } };
            list = await productModel.aggregate([
                match,
                sortCond
            ]);
        }else{
            list = await productModel.aggregate([
                match
            ]);
        }
        return list;
        
        //return await productModel.find();
    }

    async function createProduct(data){
        let product = new productModel(data);
        return product.save();
    }

    async function deleteProduct(id){
        let deleteProduct = productModel.deleteOne(id);
    }

module.exports = { getProduct, getProductList, createProduct, deleteProduct };