const express = require("express");
const { verifyJwtToken, verifyNaverToken} = require('../../middlewares/authMiddleware');
const {
  localLoginController,
  naverLoginController,
} = require("../../controllers/auth/loginController");
const {
  localSignUpController,
  naverSignUpController,
  sendVerificationCodeController,
  verifyEmailCodeController,
  setProfileController,
} = require("../../controllers/auth/signUpController");


const router = express.Router();

// 회원가입 라우터
router.post("/signup", localSignUpController);
router.post("/signup/naver", naverSignUpController);
router.post("/signup/google", naverSignUpController);
router.post("/signup/kakao", naverSignUpController);
router.post("/signup/setprofile", setProfileController);
router.post("/send-verification-code", sendVerificationCodeController);
router.post("/verify-email-code", verifyEmailCodeController);

// 로그인 라우터
router.post("/login", localLoginController);
router.post("/login/naver", naverLoginController);
router.post("/login/google", naverLoginController);
router.post("/login/kakao", naverLoginController);

//유저 업데이트
router.post("/update")

//프로필 라우터
router.post("/profile/set")


router.get("/oauth/naver/checkToken", verifyNaverToken, (req, res) => {
  res.status(200).json({ message: 'Token is valid' });
});
router.get("/checkToken", verifyJwtToken, (req, res) => {
  res.status(200).json({ message: 'Token is valid' });
});

module.exports = router;
