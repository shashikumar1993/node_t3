const customerModel = require('../models/customer.model')

const { hashPassword , verifyPassword } = require('../authenticate');
const { createToken } = require('../jwtToken');

const signup = async (user) => {
    let userData = {
        Name:user.name,
        City:"",
        Mobile:user.mobile,
        Email:user.email,
        Password: await hashPassword(user.password),
    }
    console.log(userData);
    let check = await customerModel.find({Email:{$exists:true}, Email:user.email});
    console.log("check : ",check);
    if( check != null && check.length ){
        return {status:400,msg:"User already exists with same email"};
    }else{
        try{
            let user = new customerModel(userData);
            let saveStatus = await user.save();
            
            console.log(saveStatus._id);

            if( saveStatus._id ){
                return {status:200,msg:"User registered successfully"};
            }
            return {status:400,msg:"User creation failed"};
        }catch(error){
            if( error.code === 11000 ){
                return {status:400,msg:"User already exists with same email"};
            }
        }
        
    }
}

const login = async (user) => {

    console.log("Payload : ",user);
    let check = await customerModel.find({Email:{$exists:true}, Email:user.email},{_id:1,Name:1,Email:1,Mobile:1,Password:1});
    console.log("check : ",check);
    if( check != null && check.length == 0 ){
        return {status:400,msg:"Email not found"};
    }else{
        let pstatus = await verifyPassword(check[0].Password,user.password);
        //console.log(pstatus);
        if( pstatus ){
            let result = {userId:check[0]._id,name:check[0].Name};
            let token = createToken(result);
            return {status:200,msg:"Logged successfully",token:token};
        }else{
            return {status:400,msg:"Invalid password"};
        }
        
    }
}

module.exports = { signup, login };