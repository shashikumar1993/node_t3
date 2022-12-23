const cart = require('../middleware/cart');
const { saveItemToCart, processOrder, processPayment, verifyPayment , getInvoice , getOrdersList } = require('../service/cart.service');
class Cart{

    async saveToCart(req,res){
        const cartStatus = await saveItemToCart(req,res);
        if( cartStatus ){
            res.json({status:200,msg:"Saved successfully"});
        }else{
            res.json({status:200,msg:"Faled to save cart"});
        }
        
    }

    async placeOrder(req,res){
        const cartStatus = await processOrder(req);
        res.json(cartStatus);
        // if( cartStatus ){
        //     res.json({status:200,msg:"Order placed successfully"});
        // }else{
        //     res.json({status:200,msg:"Faled to save order"});
        // }
        
    }

    async startPayment(req,res){
        const result = await processPayment(req.query.orderId);
        //res.send(result);
        if( result?.id ){
            res.render('payment.ejs',{result});
        }
    }

    async verifyPayment(req,res){
        //console.log(req.body);
        let params = {
            razorpay_payment_id : req.body.razorpay_payment_id,
            razorpay_order_id : req.body.razorpay_order_id,
            razorpay_signature : req.body.razorpay_signature,
        };
        const cartStatus = await verifyPayment(params);
        if( cartStatus ){
            res.json({status:200,msg:"Order payment successfull"});
        }else{
            res.json({status:200,msg:"Faled to save order"});
        }
    }

    async getOrderInvoice(req,res){
        const orderData = await getInvoice(req.query.orderId);
        res.setHeader("Content-Type", "application/pdf");// By Default Content Type is application/octet-stream and that is getting downloaded so we need to change it
        res.send(orderData);

        // if( cartStatus ){
        //     res.json({status:200,msg:"Order payment successfull"});
        // }else{
        //     res.json({status:200,msg:"Faled to save order"});
        // }
    }

    async orderList(req,res){
        const orderData = await getOrdersList(req.query.orderId);
        //res.setHeader("Content-Disposition", `attachment;filename="Invoice-''.xlsx`);// By Default Content Type is application/octet-stream and that is getting downloaded so we need to change it

        //res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");

        res.sendFile(orderData);
        // if( orderData != '' ){
        //     res.json({status:200,msg:"Excel generated successfully"});
        // }else{
        //     res.json({status:200,msg:"Faled to generate"});
        // }
    }
}

module.exports = new Cart();