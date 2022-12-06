const {signup, login} = require('../service/user.service');

class UserController{

    async signup(req,res){
        res.json(await signup(req.body) );
    }

    async login(req,res){
        res.json(await login(req.body) );
    }
}

module.exports = new UserController();