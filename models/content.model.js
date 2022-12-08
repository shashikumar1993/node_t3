const mongoose = require('mongoose');

module.exports = mongoose.model('Content',new mongoose.Schema({
    type:String,
    content:String,
},{
    timestamps:true
}))