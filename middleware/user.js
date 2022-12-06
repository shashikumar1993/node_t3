const { string, number } = require('joi');
const joi = require('joi');

class UserValidator{

    async validateSignup(req,res,next){

        const schema = joi.object({
            name:joi.string().required(),
            email:joi.string().required(),
            mobile:joi.number().required(),
            password:joi.string().required(),
        });

        try{
            const { error } = schema.validate(req.body)
            console.log('Validation Log : ', error);
            if (error) {
                //let message = "Please enter valid Pan number";
                //return clientError(req, res, message);
                res.send({status:400,msg:error.details[0].message});
            }
            return next();

        }catch(error){
            console.log('Something went wrong!!!');
        }
    }

    async validateLogin(req,res,next){

        const schema = joi.object({
            email:joi.string().required(),
            password:joi.string().required(),
        });

        try{
            const { error } = schema.validate(req.body)
            console.log('Validation Log : ', error);
            if (error) {
                //let message = "Please enter valid Pan number";
                //return clientError(req, res, message);
                res.send({status:400,msg:error.details[0].message});
            }
            return next();

        }catch(error){
            console.log('Something went wrong!!!');
        }
    }

}

module.exports = new UserValidator();