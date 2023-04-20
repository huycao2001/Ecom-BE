const { json } = require("express");
const Order = require("../models/order.js");
const Cart = require("../models/cart.js");
//import Cart from "../models/Cart";
//import User from "../models/User";
//import config from "config";
//const stripe = require('stripe')(config.get('StripeAPIKey'));

const mongoose = require('mongoose');


var request = require('request');

const crypto = require('crypto');

// Get orders that belong to a user
module.exports.get_user_orders = async (req, res) => {
    const userId = req.params.userId;
    try{
        Order.find({ userId })
        .sort({ date: -1 })
        .then((orders) => res.json({
            msg : "Successful", 
            data : orders
        }));



    }catch(e){
        return res.json({
            msg : e.message
        })
    }
};



//Get all orders
module.exports.get_all_orders = async (req, res) => {
    const userId = req.params.id;
    try{
        Order.find()
        .sort({ date: -1 })
        .then((orders) => res.json({
            msg : "Successful", 
            data : orders
        }));
    }catch(e){
        return res.json({
            msg : e.message
        })
    }
};



// Create order
module.exports.create_order = async (req, res) => {
    var {userId, items, shippingInfo, bill ,dateAdded, status } = req.body;
    // return res.json({
    //     userId, items, shippingInfo, bill ,dateAdded, status
    // })

    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const newOrder = new Order(req.body);
        
        newOrder.save();


        // TODO : Delete cart if needed
        const cart = await Cart.findOne({ userId });

        if(cart){
            // throw new Error('The user does not have any cart');
            await cart.remove();

        }

        
        await session.commitTransaction();
        session.endSession();

        return res.json({
            msg: 'Successful',
            // deletedItem : productItem
          });


        
    }catch(e){
        await session.abortTransaction();
        session.endSession();
        return res.json({
            msg : e.message
        })
    }

};






// Update order information
module.exports.update_order = (req, res) => {
    Order.findByIdAndUpdate(req.params.id, req.body).then(function (item) {
        Order.findById(req.params.id).then(function (item) {
            res.json(item);
        });
    });
};


module.exports.momoCheckout = (req, res) => {

    const partnerCode = "MOMOBKUN20180529"
    const accessKey = 'klm05TvNBzhg7h7j'
    const secretKey = "at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa"
    const amount = "10000";
    const extraData = "merchantName=MoMo Partner"

    // console.log(redirectHost,ipnHost)
    const redirectUrl = "localhost:3000";
    const ipnUrl = "localhost:3000";

    const orderId = "1681813129";
    const orderInfo = "momo payment"
    // const requestId = partnerCode + new Date().getTime();
    const requestId = "1681813126";

    const requestType = "captureMoMoWallet"

    const returnUrl = "https://hk-222-co-3027-e-comm.vercel.app/"; 
    const notifyUrl = "https://hk-222-co-3027-e-comm.vercel.app/";

    const rawSignature = [
          `partnerCode=${partnerCode}`,
          `accessKey=${accessKey}`,
          `requestId=${requestId}`,
          `amount=${amount}`,
          `orderId=${orderId}`,
          `orderInfo=${orderInfo}`,
          `returnUrl=${returnUrl}`, 
          `notifyUrl=${notifyUrl}`, 
          `extraData=${extraData}`,
      ].join("&")

      console.log("raw +  " + rawSignature)


      var signature = crypto.createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');

      console.log("signature is " + signature);
// "2b7e6a7fbb6b1effa32d1e07e41161df4b1e4368886c2f51b79528d915d9cf0b"
    var clientServerOptions = {
        uri: 'https://test-payment.momo.vn/gw_payment/transactionProcessor',
        body: JSON.stringify({
            "partnerCode": partnerCode,
            "accessKey": accessKey,
            "requestId": requestId,
            "amount": amount,            
            "orderId": orderId,
            "orderInfo": orderInfo,
            "returnUrl": returnUrl,
            "notifyUrl": notifyUrl,
            "extraData": extraData,
            "requestType": requestType,
            "signature": signature
            
          }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    request(clientServerOptions, function (error, response) {
        console.log(error,response.body);
        return res.json(JSON.parse(response.body));
    });
};


/*module.exports.checkout = async (req,res) => {
    try{
        const userId = req.params.id;
        const {source} = req.body;
        let cart = await Cart.findOne({userId});
        let user = await User.findOne({_id: userId});
        const email = user.email;
        if(cart){
            const charge = await stripe.charges.create({
                amount: cart.bill,
                currency: 'inr',
                source: source,
                receipt_email: email
            })
            if(!charge) throw Error('Payment failed');
            if(charge){
                const order = await Order.create({
                    userId,
                    items: cart.items,
                    bill: cart.bill
                });
                const data = await Cart.findByIdAndDelete({_id:cart.id});
                return res.status(201).send(order);
            }
        }
        else{
            res.status(500).send("You do not have items in cart");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}*/
