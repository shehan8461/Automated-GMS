const express = require("express");
const userController = require("../controllers/userController_HR");
const authMiddleware = require("../middleware_HR/authMiddleware_HR");
const USER_ROLES = require("../constants_HR/roles_HR");

const router = express.Router();

router.get("/", authMiddleware([USER_ROLES.EXECUTIVE, USER_ROLES.MANAGER]), userController.getUsers);
router.get("/count", authMiddleware([USER_ROLES.EXECUTIVE, USER_ROLES.MANAGER]), userController.getUsersCount);
router.get("/resigned", authMiddleware([USER_ROLES.EXECUTIVE, USER_ROLES.MANAGER]), userController.getResignedEmployees);
router.get("/resigned/count", authMiddleware([USER_ROLES.EXECUTIVE, USER_ROLES.MANAGER]), userController.getResignedEmployeesCount);
router.get("/:id", authMiddleware([USER_ROLES.EXECUTIVE, USER_ROLES.MANAGER]), userController.getUserById);
router.patch("/:id", authMiddleware([USER_ROLES.EXECUTIVE, USER_ROLES.MANAGER]), userController.updateUser);
router.delete("/:id", authMiddleware([USER_ROLES.EXECUTIVE, USER_ROLES.MANAGER]), userController.deleteUser);
router.patch("/:id/training", authMiddleware([USER_ROLES.EXECUTIVE, USER_ROLES.MANAGER]), userController.addTrainingToUser);

module.exports = router;
