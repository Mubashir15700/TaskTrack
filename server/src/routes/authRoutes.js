const express = require("express");
const passport = require("../configs/passportConfig");
const catchAsync = require("../utils/errorHandlingUtils/catchAsync");

const router = express.Router();

const AuthController = require("../controllers/authControllers");
const AuthService = require("../services/authServices");
const AdminRepository = require("../repositories/adminRepository");
const UserRepository = require("../repositories/userRepository");
const ReasonRepository = require("../repositories/reasonRepository");

const adminRepository = new AdminRepository();
const userRepository = new UserRepository();
const reasonRepository = new ReasonRepository();
const authService = new AuthService(adminRepository, userRepository, reasonRepository);
const authController = new AuthController(authService);

// admin
router.get("/admin/checkauth", catchAsync(authController.checkAuth.bind(authController)));

router.post("/login", catchAsync(authController.login.bind(authController)));

// user
// initial google oauth login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
// Handle Google authentication callback
router.get("/google/callback", authController.handleGoogleLoginCallback);

router.get("/checkauth", catchAsync(authController.checkAuth.bind(authController)));
router.get("/checkauth", catchAsync(authController.checkAuth.bind(authController)));
router.post("/sign-up", catchAsync(authController.userSignUp.bind(authController)));
router.post("/verify-otp", catchAsync(authController.verifyOtp.bind(authController)));
router.post("/resend-otp", catchAsync(authController.resendOtp.bind(authController)));
router.post("/confirm-email", catchAsync(authController.confirmEmail.bind(authController)));
router.post("/reset-password", catchAsync(authController.resetPassword.bind(authController)));

// logout
router.post("/logout", catchAsync(authController.logout.bind(authController)));

module.exports = router;
