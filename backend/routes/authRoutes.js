const router = require("express").Router();
const userController = require("../controllers/userControllers");
const { authGuard } = require("../middleware/authGuard");

//sending the otp
router.post("/send-otp", authGuard, userController.sendOTP);

//verifying otp and updating the password

router.post(
  "/verify-otp-and-update-password",
  authGuard,
  userController.verifyOTPAndUpdatePassword
);

module.exports = router;
