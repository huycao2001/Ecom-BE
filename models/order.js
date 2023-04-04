const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userId: {
        type: String,
    },
    // items: [
    //     {
    //         productId: {
    //             type: String,
    //             ref: "item",
    //         },
    //         name: String,
    //         volume: String,
    //         optionId: String,
    //         quantity: {
    //             type: Number,
    //             required: true,
    //             min: [1, "Quantity can not be less then 1."],
    //         },
    //         price: Number,
    //     },
    // ],
    items: [
        {
            image: {
                type : String,
                required: false
            },
            productId: {
                type: String,
                required : true
            },
            // optionId: {
            //     type: String,
            // },
            name: {
                type : String, 
                required : true
            },
            // volume: String,
            colorOption : {
                type : String,
                required : false
            },
            storageOption : {
                type : String,
                required : false
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, "Quantity can not be less then 1."],
                default: 1,
            },
            price: Number,
        },
    ],
    shippingInfo: {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        contact: {
            type: String,
            required: true,
        },
    },
    bill: {
        type: Number,
        required: true,
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        required: true
    },
});

module.exports = Order = mongoose.model("order", OrderSchema);
