const { default: Mongoose } = require('mongoose');
const cartModel = require('../models/cart.model')
const productModel = require('../models/cart.model')
const orderModel = require('../models/order.model')

async function saveItemToCart(req,res){
    console.log('Service Called');
    //return req.body;
    
    //return await cartModel.findOneAndUpdate({req.body.userid},req.body,{
        // upsert:true,
        // new:true
    //})
    let check = await cartModel.findOne({userId:req.body.userId,itemId:req.body.itemId});
    console.log("Check data : ",check);
    let updateStatus = '';
    if( check != null ){
        updateStatus = await cartModel.updateOne({userId:req.body.userId,itemId:req.body.itemId},{$set:{qty:req.body.qty}})
        if( updateStatus.modifiedCount ){
            return true;
        }
        return false;
    }else{
        let cart = new cartModel(req.body);
        updateStatus = await cart.save();
        if( updateStatus && updateStatus._id ){
            return true;
        }
        return false;
    }
}

async function processOrder(req){
    //console.log('cartData : ',req.body);
    let total = 0;
    let orderItems = [];
    let cartData = await cartModel.aggregate(
        [
            {
                $match:{ userId : Mongoose.Types.ObjectId(req.body.userId) },
            },{
                $lookup:{
                    from:"products",
                    localField:"itemId",
                    foreignField:"_id",
                    as:"productData",
                }
            },{
                $project:{
                    qty:1,
                    itemId:1,
                    'productData._id':1,
                    'productData.name':1,
                    'productData.price':1,
                }
            },
            {$unwind:"$productData"},
            {
                $project:{
                    qty:1,
                    name:"$productData.name",
                    price:"$productData.price",
                    total: {$multiply : ["$productData.price","$qty"]},
                }
            }
        ]
    );
    console.log('cartData : ',cartData);

    for(let item of cartData){
        total += item.total;
        orderItems.push({name:item.name,price:item.price,total:total,qty:item.qty});
    }

    let order = new orderModel({
        userId:req.body.userId,
        items:orderItems,
        total:total
    });

    console.log("Order data : ",order);
    let orderStatus = await order.save();
    if( orderStatus._id ){
        await cartModel.deleteMany({userId:req.body.userId})
        return true
    }
    return false;
}

module.exports = { saveItemToCart, processOrder };