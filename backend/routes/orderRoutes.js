const express = require("express");
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware(["CUSTOMER"]), orderController.createOrder);
router.get("/", authMiddleware(["ORDER_MANAGER", "CUSTOMER"]), orderController.getOrders);
router.get("/my-orders", authMiddleware(["CUSTOMER"]), orderController.getOrdersByCustomer);
router.get("/count", authMiddleware(["ORDER_MANAGER"]), orderController.getOrdersCount);
router.get("/total-sales", authMiddleware(["ORDER_MANAGER"]), orderController.getTotalSales);
router.get("/:id", authMiddleware(["ORDER_MANAGER", "CUSTOMER"]), orderController.getOrderById);
router.patch("/:id", authMiddleware(["ORDER_MANAGER"]), orderController.updateOrder);
router.delete("/:id", authMiddleware(["ORDER_MANAGER"]), orderController.deleteOrder);

module.exports = router;
