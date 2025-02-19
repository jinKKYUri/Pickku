const express = require("express");
const { authenticate } = require('../middlewares/authMiddleware');
const {
  registUserController,
  registProfileController,
  localLoginController,
} = require("../controllers/authController");

const router = express.Router();

router.post("/setprofile", registProfileController)
// router.post("/userseq",getUserSeqController)
router.post("/signup", registUserController);
router.post("/login", localLoginController);

router.get("/checkToken", authenticate, (req, res) => {
  res.status(200).json({ message: 'Token is valid' });
});
module.exports = router;
