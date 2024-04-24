const express = require("express");
const payrollController = require("../controllers/payrollController_HR");
const authMiddleware = require("../middleware_HR/authMiddleware_HR");
const USER_ROLES = require("../constants_HR/roles_HR");

const router = express.Router();

router.get("/", authMiddleware([USER_ROLES.EXECUTIVE, USER_ROLES.MANAGER]), payrollController.getPayrolls);
router.get("/employee", authMiddleware([USER_ROLES.EXECUTIVE, USER_ROLES.MANAGER, USER_ROLES.GENERAL]), payrollController.getEmployeePayrolls);
router.get("/:id", authMiddleware([USER_ROLES.EXECUTIVE, USER_ROLES.MANAGER]), payrollController.getPayrollById);
router.patch("/:id", authMiddleware([USER_ROLES.EXECUTIVE, USER_ROLES.MANAGER]), payrollController.updatePayroll);
router.delete("/:id", authMiddleware([USER_ROLES.EXECUTIVE, USER_ROLES.MANAGER]), payrollController.deletePayroll);

module.exports = router;
