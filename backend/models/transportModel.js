const mongoose = require("mongoose");

const transportSchema = mongoose.Schema(
    {
        job:{
            type:String,
            required:true,
        },
        driver:{
            type:String,
            required:true,
        },
        vehicle:{
            type:String,
            required:true,
        },
        vehicleNumber:{
            type:String,
            required:true,
        },
        date:{
            type:Date,
            required:true,
        },
        time:{
            type:String,
            required:true,
        },
        cost:{
            type:Number,
            required:true,
        },
        description:{
            type:String,
            required:true,
        }
    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model('Travels', transportSchema);
