const express = require("express");
const stripeController = require("../controllers/stripeController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add-new-card", authMiddleware(["ORDER_MANAGER", "CUSTOMER"]), stripeController.addNewCard);
router.post("/create-payment-intent", authMiddleware(["ORDER_MANAGER", "CUSTOMER"]), stripeController.createPaymentIntent);
router.post("/get-payment-methods", authMiddleware(["ORDER_MANAGER", "CUSTOMER"]), stripeController.getPaymentMethods);

module.exports = router;
