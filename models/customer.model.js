const mongoose  = require('mongoose');

module.exports = mongoose.model('Customer',new mongoose.Schema({
    AccountNo:Number,
    Name:String,
    City:String
},{
    timestamps:true
}));