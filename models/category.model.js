const mongoose = require('mongoose');

module.exports = mongoose.model('Category',new mongoose.Schema({
    name:String,
    image:String,
    isDeleted:Number,
},{
    timestamps:true
}))