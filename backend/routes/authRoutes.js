const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/customer/signup", authController.customerSignup);
router.post("/login", authController.login);

module.exports = router;
