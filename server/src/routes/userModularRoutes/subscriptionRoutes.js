const express = require("express");
const { userHasToken } = require("../../middlewares/hasTokenMiddleware");
const catchAsync = require("../../utils/errorHandlingUtils/catchAsync");

const router = express.Router();

const UserRepository = require("../../repositories/userRepository");
const userRepository = new UserRepository();

const SubscriptionRepository = require("../../repositories/subscriptionRepository");
const subscriptionRepository = new SubscriptionRepository();

const SubscriptionController = require("../../controllers/userControllers/subscriptionControllers");
const SubscriptionService = require("../../services/userServices/subscriptionServices");
const subscriptionService = new SubscriptionService(subscriptionRepository, userRepository);
const subscriptionController = new SubscriptionController(subscriptionService);

// subscriptions
router.get("/stripe-public-key", catchAsync(subscriptionController.getStripePublicKey.bind(subscriptionController)));
router.post("/create", catchAsync(subscriptionController.createSubscription.bind(subscriptionController)));
router.post("/save", catchAsync(subscriptionController.saveSubscriptionResult.bind(subscriptionController)));
router.get("/active-plan", catchAsync(subscriptionController.getActivePlan.bind(subscriptionController)));
// webhook
router.post("/", express.raw({ type: "application/json" }), catchAsync(subscriptionController.testWebhook.bind(subscriptionController)));

module.exports = router;
