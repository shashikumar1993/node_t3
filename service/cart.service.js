const cartModel = require('../models/cart.model')
const productModel = require('../models/cart.model')

async function saveItemToCart(req,res){
    console.log('Service Called');
    //return req.body;
    
    //return await cartModel.findOneAndUpdate({req.body})
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

module.exports = { saveItemToCart };