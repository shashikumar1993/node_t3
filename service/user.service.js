const customerModel = require('../models/customer.model')

const signup = async (user) => {
    console.log(user);
    let userData = {
        Name:user.name,
        City:"",
        Mobile:user.mobile,
        Email:user.email,
        Password:user.password,
    }
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
    let check = await customerModel.find({Email:{$exists:true}, Email:user.email, Password:user.password},{_id:1,Name:1,Email:1,Mobile:1});
    console.log("check : ",check);
    if( check != null && check.length == 0 ){
        return {status:400,msg:"Invalid credentials"};
    }else{
        let result = {status:200,msg:"Logged successfully",data:{userId:check[0]._id,name:check[0].Name}};
        return result;
    }
}

module.exports = { signup, login };