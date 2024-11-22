const { authenticateUser, registUserService, registProfileService } = require('../services/authService');

// 회원가입
async function registUserController(req, res) {
  const { userId, email, phone, password  } = req.body;
  try {
    const userData = {
      userId, 
      email, 
      password, 
      phone
    };
    await registUserService(userData);
    res.status(200).json({ message: '회원가입 성공' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

//프로필 저장
async function registProfileController(req,res){
  const {userNick,userContent,userImg} = req.body;
  try{
    const userData = {
      userNick,
      userContent,
      userImg
    }
    await registProfileService(userData);
    res.status(200).json({ message: '회원가입 성공' });
  }catch(error){
    res.status(400).json({ message: error.message });
  }
}

// 로그인
async function login(req, res) {
  const { userId, userPw } = req.body;
  try {
    const token = await authenticateUser(userId, userPw);
    res.status(200).json({ message: '로그인 성공', token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { registUserController, login ,registProfileController};