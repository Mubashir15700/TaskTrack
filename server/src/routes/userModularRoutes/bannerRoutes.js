const express = require("express");
const catchAsync = require("../../utils/errorHandlingUtils/catchAsync");

const router = express.Router();

const BannerRepository = require("../../repositories/bannerRepository");
const bannerRepository = new BannerRepository();

const ChatRepository = require("../../repositories/chatRepository");
const chatRepository = new ChatRepository();

const UserUtilityController = require("../../controllers/userControllers/userUtilityControllers");
const UserUtilityService = require("../../services/userServices/userUtilityServices");

const userUtilityService = new UserUtilityService(bannerRepository, chatRepository);
const userUtilityController = new UserUtilityController(userUtilityService);

// home page
router.get("/", catchAsync(userUtilityController.getBanners.bind(userUtilityController)));

module.exports = router;
