const express = require("express");
const catchAsync = require("../utils/errorHandlingUtils/catchAsync");

const router = express.Router();

const UtilityController = require("../controllers/utilityControllers");
const UtilityService = require("../services/utilityServices");
const UserRepository = require("../repositories/userRepository");
const LaborerRepository = require("../repositories/laborerRepository");
const JobRepository = require("../repositories/jobRepository");
const BannerRepository = require("../repositories/bannerRepository");
const PlanRepository = require("../repositories/planRepository");

const userRepository = new UserRepository();
const laborerRepository = new LaborerRepository();
const jobRepository = new JobRepository();
const bannerRepository = new BannerRepository();
const planRepository = new PlanRepository();
const utilityService = new UtilityService(userRepository, laborerRepository, jobRepository, bannerRepository, planRepository);
const utilityController = new UtilityController(utilityService);

// search
router.get("/search", catchAsync(utilityController.search.bind(utilityController)));

module.exports = router;
