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
}

module.exports = new ProductValidator();