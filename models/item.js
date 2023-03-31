const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    // Gender: {
    //     type: String,
    //     required: true,
    // },
    // ID: {
    //     type: Number,
    //     required: true,
    // },
    // Brand: {
    //     type: String,
    //     required: true,
    // },
    // Name: {
    //     type: String,
    //     required: true,
    // },
    // Image: String,
    // Price_range: {
    //     type: String,
    //     required: true,
    // },
    // Option: [],
    name:{
        type: String,
        required : true
    },
    price:{
        type : Number,
        required : true
    },
    badges : {
        type : Array,
        required : false,
        default :[]
    },
    imgUrl:{
        type : String, 
        required : true
    },
    category: String, 

    descriptions : {
        type : Array,
        required : false,
        default :[]
    },

    storage_options : {
        type : Array,
        required : false,
        default :[]
    },
    color_options : {
        type : Array,
        required : false,
        default :[]
    },

    promotion_options : {
        type : Array,
        required : false,
        default :[]
    },

    status_options : {
        type : Array,
        required : false,
        default :[]
    }



});

module.exports = Product = mongoose.model("Product", productSchema);
