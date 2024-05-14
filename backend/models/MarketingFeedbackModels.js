const mongoose=require("mongoose")

const formschema=mongoose.Schema({
    name:String,
    email:String,
    L_date:String,
    L_type:String,
   F_type:String,
   F_description:String,
  
   

},{
    timestamps:true

})

const usermodel=mongoose.model("feedback",formschema)

module.exports = usermodel;