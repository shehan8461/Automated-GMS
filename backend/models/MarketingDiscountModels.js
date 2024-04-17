const mongoose=require("mongoose")


const discount=mongoose.Schema({
    item:String,
    prize:Number,
    dis:Number
   
    
 
 },{
     timestamps:true
 
 })
 
 const discountmodel=mongoose.model("discount",discount)

 module.exports=discountmodel;