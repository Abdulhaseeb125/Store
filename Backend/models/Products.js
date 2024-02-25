let mongoose = require('mongoose');
const ConnectMongo = require('../db');


let date = new Date();
let schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: null,
    }
    ,
    description: {
        type: String,
        default: null,
        min: 5
    },
    image: {
        type: String,
        required: true,
        default: null
    },
    price: {
        type: Number,
        required: true,
        default: null
    },
    category: {
        type: Enumerator(),
        enum: ["Food"],
        required: true,
        default: null
    },
    brand: {
        type: String,
        default: null
    }
    ,
    targetSection: {
        type: String,
        required: true,
        default: null
    },
    stock_quantity: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: date.toString()
    },
    updated_at: {
        type: Date,
        default: null
    }
})

let ProductModel = mongoose.model("Products", schema);
module.exports = ProductModel;










