const { saveItemToCart } = require('../service/cart.service');
class Cart{

    async saveToCart(req,res){
        const cartStatus = await saveItemToCart(req,res);
        if( cartStatus ){
            res.json({status:200,msg:"Saved successfully"});
        }else{
            res.json({status:200,msg:"Faled to save cart"});
        }
        
    }
}

module.exports = new Cart();