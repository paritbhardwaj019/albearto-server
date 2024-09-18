const express = require("express");
const userController = require("../controllers/user.controller");
const validateSignup = require("../validation/signup.validation");
const validateSignin = require("../validation/signin.validation");

const router = express.Router();

router.post("/sign-up", validateSignup, userController.signupHandler);
router.post("/sign-in", validateSignin, userController.signinHandler);
router.post("/forgot-password", userController.forgotPasswordHandler);
router.put("/reset-password", userController.resetPasswordHandler);

module.exports = router;
