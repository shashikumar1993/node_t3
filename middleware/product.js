const joi = require('joi');
const app = require('express')()

class ProductValidator{

    async validateProduct(req,res,next){
        const querySchema = joi.object({
            name:joi.string().required(),
            price:joi.number().required(),
            image:joi.string().required(),
            description:joi.string().allow('')
        })

        try {
            const { error } = querySchema.validate(req.body);
            //console.log('Validation Log : ', error);
            if (error) {
              //let message = "Please enter valid Pan number";
              //return clientError(req, res, message);
              res.send({status:400,msg:error.details[0].message});
            }
            return next();
            //res.send(req.body);
          } catch (error) {
            console.log('Something went wrong!!!');
          }
    }

    async validateDelete(req,res,next){
        const schema = joi.object({
            productId:joi.string().required()
        })

        try{
            const { error } = schema.validate(req.query);
            if (error) {
                //let message = "Please enter valid Pan number";
                //return clientError(req, res, message);
                res.send({status:400,msg:error.details[0].message});
            }
            return next();
        }catch (error) {
            console.log('Something went wrong!!!');
          }
    }

    async validateList(req,res,next){
        const schema = joi.object({
            //search:joi.string().allow('').required(),
            sort:joi.string().valid('price','createdAt'),
            order:joi.number().when('sort',{
                is:joi.exist(),
                then:joi.valid(1,-1),
                otherwise:joi.forbidden(),
            })
        })

        try {
            const { error } = schema.validate(req.body);
            //console.log('Validation Log : ', error);
            if (error) {
              //let message = "Please enter valid Pan number";
              //return clientError(req, res, message);
              res.send({status:400,msg:error.details[0].message});
            }
            return next();
            //res.send(req.body);
          } catch (error) {
            console.log('Something went wrong!!!');
          }
    }
}

module.exports = new ProductValidator();