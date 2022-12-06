const mongoose  = require('mongoose');
const validator = require('validator');

module.exports = mongoose.model('Customer',new mongoose.Schema({
    AccountNo:Number,
    Name:String,
    City:String,
    Mobile:Number,
    Email:{
        type:String,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:"{VALUE} is not a valid email",
        },
    },
    Password:String,
},{
    timestamps:true
}));