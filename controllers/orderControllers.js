const Order = require("../models/order.js");
//import Cart from "../models/Cart";
//import User from "../models/User";
//import config from "config";
//const stripe = require('stripe')(config.get('StripeAPIKey'));

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

    try{
        const newOrder = new Order(req.body);
        newOrder.save().then((order) => res.json({
            msg : "Successful", 
            data : newOrder
        }));


        // TODO : Delete cart if needed
    }catch(e){
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
