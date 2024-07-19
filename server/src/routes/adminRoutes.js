const express = require("express");
const dashboardRoutes = require("./adminModularRoutes/dashboardRoutes");
const userRoutes = require("./adminModularRoutes/userRoutes");
const planRoutes = require("./adminModularRoutes/planRoutes");
const subscriptionRoutes = require("./adminModularRoutes/subscriptionRoutes");
const bannerRoutes = require("./adminModularRoutes/bannerRoutes");
const notificationRoutes = require("./adminModularRoutes/notificationRoutes");
const requestRoutes = require("./adminModularRoutes/requestRoutes");

const router = express.Router();

router.use("/dashboard", dashboardRoutes);
router.use("/users", userRoutes);
router.use("/plans", planRoutes);
router.use("/subscriptions", subscriptionRoutes);
router.use("/banners", bannerRoutes);
router.use("/notifications", notificationRoutes);
router.use("/requests", requestRoutes);

module.exports = router;
