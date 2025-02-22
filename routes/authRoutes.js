const express = require("express");
const { verifyJwtToken, verifyNaverToken} = require('../middlewares/authMiddleware');
const {
  registUserController,
  sendVerificationCodeController,
  verifyEmailCodeController,
  updateProfileController,
  localLoginController,
  naverTokenController,
} = require("../controllers/authController");

const router = express.Router();

// router.post("/userseq",getUserSeqController)
router.post("/signup", registUserController);
router.post("/login", localLoginController);
router.post("/setprofile", updateProfileController);
router.post("/send-verification-code", sendVerificationCodeController);
router.post("/verify-email-code", verifyEmailCodeController);
router.post("/naver/login", naverTokenController);

router.get("/oauth/naver/checkToken", verifyNaverToken, (req, res) => {
  res.status(200).json({ message: 'Token is valid' });
});
router.get("/checkToken", verifyJwtToken, (req, res) => {
  res.status(200).json({ message: 'Token is valid' });
});

module.exports = router;
