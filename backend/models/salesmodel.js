const mongoose=require("mongoose")
const cateringschema=mongoose.Schema({
    p_id:String,
    name:String,
    price:Number,
    quantity:Number,
    total:Number
    

},{
    timestamps:true

})

const cateringmodel=mongoose.model("Payment",cateringschema)

module.exports = cateringmodel;
