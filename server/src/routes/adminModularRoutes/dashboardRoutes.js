const express = require("express");
const { adminHasToken } = require("../../middlewares/hasTokenMiddleware");
const catchAsync = require("../../utils/errorHandlingUtils/catchAsync");

const router = express.Router();

const DashboardController = require("../../controllers/adminControllers/dashboardControllers");
const DashboardService = require("../../services/adminServices/dashboardServices");

const UserRepository = require("../../repositories/userRepository");
const userRepository = new UserRepository();

const JobRepository = require("../../repositories/jobRepository");
const jobRepository = new JobRepository();

const SubscriptionRepository = require("../../repositories/subscriptionRepository");
const subscriptionRepository = new SubscriptionRepository();

const dashboardService = new DashboardService(userRepository, jobRepository, subscriptionRepository);
const dashboardController = new DashboardController(dashboardService);

router.get("/", adminHasToken, catchAsync(dashboardController.getData.bind(dashboardController)));

module.exports = router;
