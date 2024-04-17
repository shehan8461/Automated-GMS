const mongoose=require("mongoose");

const orderschema=mongoose.Schema({
    name:String,
    product:String,
    quantity:Number,
    date:String,
})
const odermodel=mongoose.model("order",orderschema)

module.exports = odermodel