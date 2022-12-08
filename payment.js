const Razorpay = require('razorpay');
var instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

class Payment{

    async generateToken(paymentData) {
        let result = '';
        var options = {
            amount: paymentData.amount,  // amount in the smallest currency unit
            currency: paymentData.currency,
            receipt: paymentData.receipt,
        };
        await instance.orders.create(options, function(err, order) {
            console.log('Payment Key ',order);
            result = order;
        });
        return result;
    }
}

module.exports = new Payment();