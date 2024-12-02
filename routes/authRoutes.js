const express = require("express");
const { authenticate } = require('../middlewares/authMiddleware');
const { authenticateUserController,
    registUserController,
    registProfileController,
    getUserSeqController,
    verifyTokenController } = require("../controllers/authController");

const router = express.Router();

router.post("/setprofile",registProfileController)
router.post("/userseq",getUserSeqController)
router.post("/signup", registUserController);
router.post("/login", authenticateUserController);
router.get("/checkToken", authenticate, verifyTokenController);

module.exports = router;
