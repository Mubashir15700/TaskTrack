const express = require("express");
const { userHasToken } = require("../../middlewares/hasTokenMiddleware");
const catchAsync = require("../../utils/errorHandlingUtils/catchAsync");

const router = express.Router();

const PlanRepository = require("../../repositories/planRepository");
const planRepository = new PlanRepository();

const PlanController = require("../../controllers/userControllers/planControllers");
const PlanService = require("../../services/userServices/planServices");

const planService = new PlanService(planRepository);
const planController = new PlanController(planService);

// plans
router.get("/", userHasToken, catchAsync(planController.getPlans.bind(planController)));

module.exports = router;
