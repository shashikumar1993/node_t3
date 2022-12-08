const joi = require('joi');
const app = require('express')()
const productModel = require('../models/product.model');
const { verifyToken } = require('../jwtToken')

class CartValidator{

    async cartValidator(req,res,next){
        const querySchema = joi.object({
            itemId:joi.string().required(),
            qty:joi.number().required().min(1),
            //userId:joi.string().required(),
            //token:joi.string().required(),
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

    async orderValidator(req,res,next){
        const querySchema = joi.object({
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

    async validateToken(req,res,next){
      let tokenData = await verifyToken(req.body.token);
      console.log("Token Data : ",tokenData);
      if( tokenData == null ){
        res.send({status:400,msg:'Invalid Token'});
      }else{
        req.body.userId = tokenData.userId;
        next();
      }
    }

    async validateBearerToken(req,res,next){
      console.log(req.headers);
      const authHeader = req.headers?.authorization;
      if( authHeader?.startsWith('Bearer ')){
        const token = authHeader.substring(7,authHeader.length);
        let tokenData = await verifyToken(token);
        console.log("Token Data : ",tokenData);
        if( tokenData == null ){
          res.send({status:400,msg:'Invalid Token'});
        }else{
          req.body.userId = tokenData.userId;
          next();
        }
      }else{
        res.send({status:400,msg:'Token is required'});
      }

      // let tokenData = await verifyToken(req.body.token);
      // console.log("Token Data : ",tokenData);
      // if( tokenData == null ){
      //   res.send({status:400,msg:'Invalid Token'});
      // }else{
      //   req.body.userId = tokenData.userId;
      //   next();
      // }
    }

    async validatePayment(req,res,next){
      const querySchema = joi.object({
          orderId:joi.string().required(),
      })

      try {
          const { error } = querySchema.validate(req.query);
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
}

module.exports = new CartValidator();