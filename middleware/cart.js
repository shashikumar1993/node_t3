const joi = require('joi');
const app = require('express')()
const productModel = require('../models/product.model');

class CartValidator{

    async cartValidator(req,res,next){
        const querySchema = joi.object({
            itemId:joi.string().required(),
            qty:joi.number().required().min(1),
            userId:joi.string().required(),
        })

        try {
            const { error } = querySchema.validate(req.body);
            console.log('Validation Log : ', error);
            
            if (error) {
              //let message = "Please enter valid Pan number";
              //return clientError(req, res, message);
              res.send({status:400,msg:error.details[0].message});
            }

            if( error == null ){
                return next();
            }
            
            //res.send(req.body);
          } catch (error) {
            console.log('Something went wrong!!!');
          }
    }

    async validateItem(req,res,next){
        let checkProduct = await productModel.findById(req.body.itemId);
        if( checkProduct == null ){
            res.json({status:400,msg:"Item not found"})
        }else{ next(); }
        
    }
}

module.exports = new CartValidator();