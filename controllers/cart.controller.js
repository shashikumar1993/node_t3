const { saveItemToCart, processOrder } = require('../service/cart.service');
class Cart{

    async saveToCart(req,res){
        const cartStatus = await saveItemToCart(req,res);
        if( cartStatus ){
            res.json({status:200,msg:"Saved successfully"});
        }else{
            res.json({status:200,msg:"Faled to save cart"});
        }
        
    }

    async placeOrder(req,res){
        const cartStatus = await processOrder(req);
        if( cartStatus ){
            res.json({status:200,msg:"Order placed successfully"});
        }else{
            res.json({status:200,msg:"Faled to save order"});
        }
        
    }
}

module.exports = new Cart();