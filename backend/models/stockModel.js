//stockModel.js
// const mongoose = require("../DB/connection.js");
const mongoose=require("mongoose")

const stockSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        require: true
    },
    value: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    minimumAmount: {
        type: Number,
        require: true
    },
    description: {
        type: String
    },
    productCode: {
        type: String,
        required: true
    }
});

module.exports = stockSchema;
