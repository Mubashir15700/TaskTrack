const express = require("express");
const { adminHasToken } = require("../../middlewares/hasTokenMiddleware");
const catchAsync = require("../../utils/errorHandlingUtils/catchAsync");

const router = express.Router();

const NotificationController = require("../../controllers/notificationControllers");
const NotificationService = require("../../services/notificationServices");
const NotificationRepository = require("../../repositories/notificationRepository");
const notificationRepository = new NotificationRepository();

const notificationService = new NotificationService(notificationRepository);
const notificationController = new NotificationController(notificationService);

router.get("/count", adminHasToken, catchAsync(notificationController.getAdminNotificationsCount.bind(notificationController)));
router.get("/:page", adminHasToken, catchAsync(notificationController.getAdminNotifications.bind(notificationController)));
router.patch(
    "/:id/mark-read",
    adminHasToken,
    catchAsync(notificationController.markAdminNotificationRead.bind(notificationController))
);

module.exports = router;
