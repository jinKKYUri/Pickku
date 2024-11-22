const express = require("express");
const { authenticateUserController, registUserController, registProfileController } = require("../controllers/authController");

const router = express.Router();

router.post("/setprofile",registProfileController)
router.post("/signup", registUserController);
router.post("/login", authenticateUserController);

module.exports = router;
