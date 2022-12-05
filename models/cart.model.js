const mongoose = require('mongoose');

module.exports = mongoose.model('Cart',new mongoose.Schema({

    itemId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },

    userId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
    },
    // userId:String,
    // itemId:String,
    qty:Number,
},{
    timestamps:true
}))