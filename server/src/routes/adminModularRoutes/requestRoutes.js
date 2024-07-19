const express = require("express");
const { adminHasToken } = require("../../middlewares/hasTokenMiddleware");
const catchAsync = require("../../utils/errorHandlingUtils/catchAsync");

const router = express.Router();

const UserController = require("../../controllers/adminControllers/userControllers");
const UserService = require("../../services/adminServices/userServices");
const UserRepository = require("../../repositories/userRepository");
const userRepository = new UserRepository();

const LaborerRepository = require("../../repositories/laborerRepository");
const laborerRepository = new LaborerRepository();

const ReasonRepository = require("../../repositories/reasonRepository");
const reasonRepository = new ReasonRepository();

const RequestRepository = require("../../repositories/requestRepository");
const requestRepository = new RequestRepository();

const userService = new UserService(userRepository, laborerRepository, requestRepository, reasonRepository);
const userController = new UserController(userService);

// laborer request 
router.get("/", adminHasToken, catchAsync(userController.getRequests.bind(userController)));
router.get("/:id", adminHasToken, catchAsync(userController.getRequest.bind(userController)));
router.post("/list-unlist", adminHasToken, catchAsync(userController.approveRejectAction.bind(userController)));

module.exports = router;
