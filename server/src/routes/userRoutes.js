const express = require("express");
const bannerRoutes = require("./userModularRoutes/bannerRoutes");
const chatRoutes = require("./userModularRoutes/chatRoutes");
const jobRoutes = require("./userModularRoutes/jobRoutes");
const laborerRoutes = require("./userModularRoutes/laborerRoutes");
const notificationRoutes = require("./userModularRoutes/notificationRoutes");
const planRoutes = require("./userModularRoutes/planRoutes");
const profileRoutes = require("./userModularRoutes/profileRoutes");
const subscriptionRoutes = require("./userModularRoutes/subscriptionRoutes");

const router = express.Router();

router.use("/banners", bannerRoutes);
router.use("/chats", chatRoutes);
router.use("/messages", chatRoutes);
router.use("/jobs", jobRoutes);
router.use("/laborers", laborerRoutes);
router.use("/request", laborerRoutes);
router.use("/notifications", notificationRoutes);
router.use("/plans", planRoutes);
router.use("/profile", profileRoutes);
router.use("/subscription", subscriptionRoutes);
router.use("/webhook", subscriptionRoutes);

module.exports = router;
