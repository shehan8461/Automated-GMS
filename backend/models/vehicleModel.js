const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema(
    {
        year:{
            type:String,
            required:true,
        },
        model:{
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
        renteredCompany:{
            type:String,
            required:true,
        },
        rentalFee: {
            type: String, // Corrected type from Double to Number
            required: true,
        },
        capacity:{
            type:String, // Corrected type from Double to Number
            required:true,
        },
        descriptionOfVehicle:{
            type:String,
            required:true,
        }
    },
    {
        timestamps:true,
    }
);

const Vehicle=mongoose.model("Vehicle",vehicleSchema)

module.exports = Vehicle;
