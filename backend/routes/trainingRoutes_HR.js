const express = require("express");
const trainingController = require("../controllers/trainingController_HR");
const authMiddleware = require("../middleware_HR/authMiddleware_HR");
const USER_ROLES = require("../constants_HR/roles_HR");

const router = express.Router();

router.post("/", authMiddleware([USER_ROLES.EXECUTIVE, USER_ROLES.MANAGER]), trainingController.createTraining);
router.get("/", authMiddleware([USER_ROLES.EXECUTIVE, USER_ROLES.MANAGER]), trainingController.getTrainings);
router.get("/count", authMiddleware([USER_ROLES.EXECUTIVE, USER_ROLES.MANAGER]), trainingController.getTrainingsCount);
router.get("/:id", authMiddleware([USER_ROLES.EXECUTIVE, USER_ROLES.MANAGER]), trainingController.getTrainingById);
router.patch("/:id", authMiddleware([USER_ROLES.MANAGER]), trainingController.updateTraining);
router.delete("/:id", authMiddleware([USER_ROLES.MANAGER]), trainingController.deleteTraining);

module.exports = router;
