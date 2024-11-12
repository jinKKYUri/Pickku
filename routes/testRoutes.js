// routes/authRoutes.js
const express = require("express");
const { testSignup, testLogin } = require("../controllers/testAuthController");

const router = express.Router();

router.post("/testsignup", testSignup);
router.post("/testlogin", testLogin);

module.exports = router;
