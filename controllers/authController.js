const { registerUser, authenticateUser } = require('../services/authService');

// 회원가입
async function signup(req, res) {
  const { userId, email, phone, password  } = req.body;
  try {
    const userData = {
      userId, 
      email, 
      password, 
      phone
    };
    await registerUser(userData);
    res.status(200).json({ message: '회원가입 성공' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// 로그인
async function login(req, res) {
  const { username, password } = req.body;
  try {
    const token = await authenticateUser(username, password);
    res.status(200).json({ message: '로그인 성공', token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { signup, login };