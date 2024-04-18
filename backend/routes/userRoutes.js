const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware(["ORDER_MANAGER"]), userController.getAllUsers);

module.exports = router;
