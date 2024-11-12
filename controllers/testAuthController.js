// controllers/authController.js
const {
  testRegisterUser,
  testAuthenticateUser,
} = require("../services/testAuthService");

// 회원가입
async function testSignup(req, res) {
  const { username, password } = req.body;
  try {
    await testRegisterUser(username, password);
    res.status(201).json({ message: "회원가입 성공" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// 로그인
async function testLogin(req, res) {
  const { username, password } = req.body;
  try {
    const token = await testAuthenticateUser(username, password);
    res.status(200).json({ message: "로그인 성공", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

function main() {}

module.exports = { testSignup, testLogin };
