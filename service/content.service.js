const categoryModel = require('../models/category.model');
const contentModel = require('../models/content.model');
const productModel = require('../models/product.model');
const orderModel = require('../models/order.model')

const getHomeBanner = async(type,update) => {
    return await contentModel.findOne({type:type},{__v:0,_id:0,createdAt:0,updatedAt:0,type:0})
}

const saveHomeBanner = async(type,update) => {

    const dbStatus = await contentModel.findOneAndUpdate({type:type},{$set:update},{upsert:true})
    console.log(dbStatus);
    if( dbStatus?._id ){
        return true
    }
    return false

}

const getCategoryList = async() => {
    return await categoryModel.find({},{name:1,image:1})
}

const saveCategory = async(data) => {

    let category = new categoryModel(data);

    const dbStatus = await category.save();
    console.log(dbStatus);
    if( dbStatus?._id ){
        return true
    }
    return false

}

const getBestProductsList = async(data) => {

    let productList  = await orderModel.aggregate([
        { $unwind:"$items"},
        {"$group" : {_id:"$items.name", count:{$sum:"$items.qty"}}},
        {$sort:{"count":-1}},
        
        {
            $group : {
                _id:null,
                products:{$push:"$_id"},
            }
        }
    ]);
    // console.log("productList : ",productList);
    //return productList[0].products;
    let name = productList[0].products;
    return await productModel.find({name:{$in:name}},{createdAt:0,updatedAt:0,__v:0})
}



module.exports = { saveHomeBanner , getHomeBanner, getCategoryList, saveCategory , getBestProductsList };