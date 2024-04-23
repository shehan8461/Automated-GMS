const express = require("express");
const authController = require("../controllers/authController_HR");
const authMiddleware = require("../middleware_HR/authMiddleware_HR");
const USER_ROLES = require("../constants_HR/roles_HR");

const router = express.Router();

router.post("/employee/signup",  authMiddleware([USER_ROLES.MANAGER]), authController.employeeSignup);
router.post("/login", authController.login);

module.exports = router;
