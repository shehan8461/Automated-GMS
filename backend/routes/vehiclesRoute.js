const express = require("express");
const Vehicle = require("../models/vehicleModel.js");

const router = express.Router();

// Route for saving a new Vehicle
router.post('/', async function (request, response) {
    try {
        if (
            !request.body.year ||
            !request.body.vehicle ||
            !request.body.vehicleNumber ||
            !request.body.model ||
            !request.body.renteredCompany ||
            !request.body.rentalFee ||
            !request.body.capacity ||
            !request.body.descriptionOfVehicle
        ) {
            return response.status(400).send({
                message: 'Send all required fields: year, vehicle, model, vehicleNumber, renteredCompany, rentalFee, capacity, descriptionOfVehicle',
            });
        }
        const newVehicle = {
            year: request.body.year,
            vehicle: request.body.vehicle,
            model: request.body.model,
            renteredCompany: request.body.renteredCompany,
            rentalFee: request.body.rentalFee,
            capacity: request.body.capacity,
            vehicleNumber: request.body.vehicleNumber,
            descriptionOfVehicle: request.body.descriptionOfVehicle,
        };

        const vehicle = await Vehicle.create(newVehicle);
        return response.status(201).send(vehicle);
    } catch (error) {
        console.error(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route for getting all vehicles from the database
router.get('/', async function (request, response) {
    try {
        const vehicles = await Vehicle.find({});
        return response.status(200).json({
            count: vehicles.length,
            data: vehicles
        });
    } catch (error) {
        console.error(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route for getting one vehicle from the database
router.get('/:id', async function (request, response) {
    try {
        const { id } = request.params;
        const vehicle = await Vehicle.findById(id);
        return response.status(200).json(vehicle);
    } catch (error) {
        console.error(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route for updating a Vehicle
router.put('/:id', async function (request, response) {
    try {
        if (
            !request.body.year ||
            !request.body.vehicle ||
            !request.body.vehicleNumber ||
            !request.body.model ||
            !request.body.renteredCompany ||
            !request.body.rentalFee ||
            !request.body.capacity ||
            !request.body.descriptionOfVehicle
        ) {
            return response.status(400).send({
                message: 'Send all required fields: year, vehicle, vehicleNumber, descriptionOfVehicle',
            });
        }

        const { id } = request.params;
        const result = await Vehicle.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Vehicle not found' });
        }

        return response.status(200).send({ message: 'Vehicle updated successfully' });
    } catch (error) {
        console.error(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route for deleting a vehicle
router.delete('/:id', async function (request, response) {
    try {
        const { id } = request.params;
        const result = await Vehicle.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Vehicle not found' });
        }
        return response.status(200).send({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        console.error(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Error handling middleware
router.use(function(error, request, response, next) {
    console.error(error.message); // Log the error message
    response.status(500).send({ message: error.message }); // Send the error message as the response
});

module.exports = router;
