const mongoose = require('mongoose');

module.exports = mongoose.model('Order',new mongoose.Schema({
    userId:{
        required:true,
        type:String,
    },
    items:[
        {
            name:String,
            qty:Number,
            total:Number,
            price:Number,    
        }
    ],
    total:Number,
    paymentPayload:String,
    paymentStatus:String,
    paymentResponse:String,
    paymentId:String,
},{
    timestamps:true
}));