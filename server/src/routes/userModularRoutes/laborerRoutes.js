const express = require("express");
const { userHasToken } = require("../../middlewares/hasTokenMiddleware");
const catchAsync = require("../../utils/errorHandlingUtils/catchAsync");

const router = express.Router();

const UserRepository = require("../../repositories/userRepository");
const userRepository = new UserRepository();

const RequestRepository = require("../../repositories/requestRepository");
const requestRepository = new RequestRepository();

const ReasonRepository = require("../../repositories/reasonRepository");
const reasonRepository = new ReasonRepository();

const LaborerRepository = require("../../repositories/laborerRepository");
const laborerRepository = new LaborerRepository();

const LaborerController = require("../../controllers/userControllers/laborerControllers");
const LaborerService = require("../../services/userServices/laborerServices");

const laborerService = new LaborerService(userRepository, laborerRepository, requestRepository, reasonRepository);
const laborerController = new LaborerController(laborerService);

// laborer request
router.post("/send", userHasToken, catchAsync(laborerController.sendRequest.bind(laborerController)));
router.get("/pending/:id", userHasToken, catchAsync(laborerController.getPrevRequest.bind(laborerController)));
router.put("/update", userHasToken, catchAsync(laborerController.updateRequest.bind(laborerController)));
router.patch("/cancel", userHasToken, catchAsync(laborerController.cancelRequest.bind(laborerController)));

// laborer actions
router.get("/:id/:page", catchAsync(laborerController.getLaborers.bind(laborerController)));
router.get("/:id", catchAsync(laborerController.getLaborer.bind(laborerController)));

module.exports = router;
