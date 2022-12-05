const mongoose = require('mongoose');

module.exports = mongoose.model('Cart',new mongoose.Schema({
    userId:String,
    itemId:String,
    qty:Number,
},{
    timestamps:true
}))