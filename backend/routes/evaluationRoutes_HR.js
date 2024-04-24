const express = require("express");
const evaluationController = require("../controllers/evaluationController_HR");
const authMiddleware = require("../middleware_HR/authMiddleware_HR");
const USER_ROLES = require("../constants_HR/roles_HR");

const router = express.Router();

router.post("/", authMiddleware([USER_ROLES.EXECUTIVE, USER_ROLES.MANAGER]), evaluationController.createEvaluation);
router.get("/", authMiddleware([USER_ROLES.EXECUTIVE, USER_ROLES.MANAGER]), evaluationController.getEvaluations);
router.get("/count", authMiddleware([USER_ROLES.EXECUTIVE, USER_ROLES.MANAGER]), evaluationController.getEvaluationsCount);
router.get("/employee", authMiddleware([USER_ROLES.EXECUTIVE, USER_ROLES.MANAGER, USER_ROLES.GENERAL]), evaluationController.getEmployeeEvaluations);
router.get("/:id", authMiddleware([USER_ROLES.EXECUTIVE, USER_ROLES.MANAGER]), evaluationController.getEvaluationById);
router.patch("/:id", authMiddleware([USER_ROLES.MANAGER]), evaluationController.updateEvaluation);
router.delete("/:id", authMiddleware([USER_ROLES.MANAGER]), evaluationController.deleteEvaluation);

module.exports = router;
