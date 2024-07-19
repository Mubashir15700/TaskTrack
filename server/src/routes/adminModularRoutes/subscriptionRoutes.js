const express = require("express");
const { adminHasToken } = require("../../middlewares/hasTokenMiddleware");
const catchAsync = require("../../utils/errorHandlingUtils/catchAsync");

const router = express.Router();

const SubscriptionController = require("../../controllers/adminControllers/subscriptionControllers");
const SubscriptionService = require("../../services/adminServices/subscriptionServices");
const SubscriptionRepository = require("../../repositories/subscriptionRepository");
const subscriptionRepository = new SubscriptionRepository();

const subscriptionService = new SubscriptionService(subscriptionRepository);
const subscriptionController = new SubscriptionController(subscriptionService);

router.get("/", adminHasToken, catchAsync(subscriptionController.getSubscriptions.bind(subscriptionController)));

module.exports = router;
