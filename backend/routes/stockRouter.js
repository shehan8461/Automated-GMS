//stockRouter.js

const express = require("express");
const { createStock, getStock, updateStock, deleteStock, deductStock } = require("../controllers/stockController.js");

const stockRouter = express.Router();

stockRouter.post("/insert_stock", createStock);
stockRouter.get("/view_stock", getStock);
stockRouter.put("/update_stock/:id", updateStock);
stockRouter.delete("/delete_stock/:id", deleteStock);
stockRouter.put("/deductQuantity/:id", deductStock);

module.exports = stockRouter;
