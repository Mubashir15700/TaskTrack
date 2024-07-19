const express = require("express");
const { adminHasToken } = require("../../middlewares/hasTokenMiddleware");
const catchAsync = require("../../utils/errorHandlingUtils/catchAsync");

const router = express.Router();

const PlanController = require("../../controllers/adminControllers/planControllers");
const PlanService = require("../../services/adminServices/planServices");
const PlanRepository = require("../../repositories/planRepository");
const planRepository = new PlanRepository();

const planService = new PlanService(planRepository);
const planController = new PlanController(planService);

router.get("/", adminHasToken, catchAsync(planController.getPlans.bind(planController)));
router.get("/:id", adminHasToken, catchAsync(planController.getPlan.bind(planController)));
router.post("/add", adminHasToken, catchAsync(planController.addPlan.bind(planController)));
router.put("/:id/edit", adminHasToken, catchAsync(planController.editPlan.bind(planController)));
router.patch("/:id/list-unlist", adminHasToken, catchAsync(planController.listUnlistPlan.bind(planController)));

module.exports = router;
