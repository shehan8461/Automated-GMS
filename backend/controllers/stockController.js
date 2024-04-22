//stockController.js

const mongoose = require("mongoose");
const stockModel = require("../models/stockModel.js");

const Inventory = mongoose.model("Inventory", stockModel);

async function createStock(req, res) {
    const { ProductName, value, quantity, minimumAmount, description, productCode } = req.body;

    let stockObject = new Inventory();

    stockObject.ProductName = ProductName;
    stockObject.value = value;
    stockObject.quantity = quantity;
    stockObject.minimumAmount = minimumAmount;
    stockObject.description = description;
    stockObject.productCode = productCode;

    try {
        console.log(parseInt(req.body.productCode));
        const existingStock = await Inventory.findOne({ productCode: req.body.productCode });

        if (!existingStock) {
            await stockObject.save();
            res.send("data inserted");
            console.log("Data inserted");
        } else {
            return res.send("data exists");
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getStock(req, res) {
    try {
        const stocks = await Inventory.find();
        res.send(stocks);
        console.log("Data viewed");
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateStock(req, res) {
    const { ProductName, value, quantity, minimumAmount, description, productCode } = req.body;

    try {
        await Inventory.updateOne({ _id: req.params.id }, {
            $set: {
                ProductName: ProductName,
                value: value,
                quantity: quantity,
                minimumAmount: minimumAmount,
                description: description,
                productCode: productCode
            }
        });

        res.send("Update successful");
    } catch (err) {
        res.send("Data update failed. Error: " + err);
    }
}

async function deleteStock(req, res) {
    const id = req.params.id;

    try {
        await Inventory.findByIdAndDelete(id);
        res.send("Data deleted");
        console.log("Data deleted");
    } catch (error) {
        res.status(500).send(error);
    }
}

function sendNotification(message) {
    console.log("Notification:", message);
    // implement logic
}

async function deductStock(req, res) {
    const { deductAmount } = req.body;

    try {
        const getItemById = await Inventory.findById(req.params.id);

        if (getItemById.minimumAmount > getItemById.quantity - deductAmount) {
            sendNotification(getItemById.productName + " stock level is low. Please topup it.");
            console.log("Can't deduct because available stock is less than the minimum amount required.");
            res.status(401).json({ message: "Can't deduct because available stock is less than the minimum amount required." });
        } else {
            await Inventory.updateOne({ _id: req.params.id }, {
                $inc: { quantity: -parseInt(deductAmount) }
            });

            res.status(200).send("Stock deduction successful.");
        }
    } catch (err) {
        res.status(500).send("Error occurred: " + err);
    }
}

module.exports = {
    createStock,
    getStock,
    updateStock,
    deleteStock,
    deductStock
};
