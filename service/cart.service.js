const { default: Mongoose } = require('mongoose');
const cartModel = require('../models/cart.model')
const productModel = require('../models/cart.model')
const orderModel = require('../models/order.model')
const payment = require('../payment');

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
    //console.log('cartData : ',cartData);

    let cartTotal = 0;
    for(let item of cartData){
        cartTotal += item.total;
        orderItems.push({name:item.name,price:item.price,total:item.total,qty:item.qty});
    }

    let order = new orderModel({
        userId:req.body.userId,
        items:orderItems,
        total: Math.round( (cartTotal*100) / 100)
    });

    //console.log("Order data : ",order);
    let orderStatus = await order.save();

    let paymentData = {
        amount: (cartTotal*100),  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    let paymentResult = await payment.generateToken(paymentData);
    console.log("Payment Payload : ",paymentResult);

    let result = {status:400,msg:'Order failed to place'};
    if( orderStatus._id ){
        console.log(orderStatus._id);
        await orderModel.updateOne({_id:orderStatus._id},{$set:{paymentId:paymentResult.id,paymentStatus:'pending',paymentPayload:JSON.stringify(paymentResult)}});
        await cartModel.deleteMany({userId:req.body.userId})
        result = {status:200,msg:'Order placed successfully',orderId:orderStatus._id,payment:paymentResult};
        //return true;
    }
    console.log(result);
    return result;
}

async function processPayment(orderId,userId){
    const orderData = await orderModel.findById(orderId,{paymentPayload:1,total:1});
    if( orderData ){
        let paymentData = JSON.parse(orderData.paymentPayload);
        console.log('paymentData : ',paymentData)
        return paymentData;
    }
    //console.log('orderData : ',orderData);
    return {};
}

async function verifyPayment(params){
    console.log("params : ",params);
    console.log(JSON.stringify(params));
    const orderData = await orderModel.findOne({paymentId:params.razorpay_order_id},{paymentPayload:1,total:1});
    if( orderData ){
        await orderModel.updateOne({paymentId:params.razorpay_order_id},{$set:{paymentStatus:'completed',paymentResponse:JSON.stringify(params)}});
        return true;
    }
    return false;
}

module.exports = { saveItemToCart, processOrder, processPayment, verifyPayment };