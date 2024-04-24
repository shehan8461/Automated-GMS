const mongoose=require("mongoose");

const dataschema=mongoose.Schema({
    name:String,
    phone:String,
    product:String,
    type:String,
    unitPrice:Number,
    contractStart:String,
    contractEnd:String,
})




const supplierModel=mongoose.model("supplier",dataschema)

module.exports = supplierModel;