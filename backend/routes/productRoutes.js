const express = require("express");
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware(["ORDER_MANAGER"]), productController.createProduct);
router.get("/", authMiddleware(["ORDER_MANAGER", "CUSTOMER"]), productController.getProducts);
router.get("/count", authMiddleware(["ORDER_MANAGER"]), productController.getProductsCount);
router.get("/:id", authMiddleware(["ORDER_MANAGER", "CUSTOMER"]), productController.getProductById);
router.patch("/:id", authMiddleware(["ORDER_MANAGER"]), productController.updateProduct);
router.delete("/:id", authMiddleware(["ORDER_MANAGER"]), productController.deleteProduct);

module.exports = router;
