const loginController = require("../../controllers/loginController");
const matchOTP = require("../../controllers/machOtpController");
const register = require("../../controllers/registerController");

const router = require("express").Router();

router.post("/register", register);
router.post("/mathOtp", matchOTP);
router.post("/login", loginController);

module.exports = router;
