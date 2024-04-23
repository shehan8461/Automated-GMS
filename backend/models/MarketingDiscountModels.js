const mongoose=require("mongoose")


const discountschema=mongoose.Schema({
    item:String,
    prize:Number,
    dis:Number
   
    
 
 },{
     timestamps:true
 
 })
 
 const discountmodel=mongoose.model("discount",discountschema)

 module.exports=discountmodel;