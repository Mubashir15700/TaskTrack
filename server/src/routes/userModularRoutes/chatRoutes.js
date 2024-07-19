const express = require("express");
const { userHasToken } = require("../../middlewares/hasTokenMiddleware");
const catchAsync = require("../../utils/errorHandlingUtils/catchAsync");

const router = express.Router();

const BannerRepository = require("../../repositories/bannerRepository");
const bannerRepository = new BannerRepository();

const ConversationRepository = require("../../repositories/conversationRepository");
const conversationRepository = new ConversationRepository();

const ChatRepository = require("../../repositories/chatRepository");
const chatRepository = new ChatRepository();

const UserUtilityController = require("../../controllers/userControllers/userUtilityControllers");
const UserUtilityService = require("../../services/userServices/userUtilityServices");

const userUtilityService = new UserUtilityService(bannerRepository, chatRepository, conversationRepository);
const userUtilityController = new UserUtilityController(userUtilityService);

router.get(
    "/",
    userHasToken,
    catchAsync(userUtilityController.getChatLists.bind(userUtilityController))
);

router.patch(
    "/mark-read/",
    userHasToken,
    catchAsync(userUtilityController.updateMessagesReadStatus.bind(userUtilityController))
);

module.exports = router;
