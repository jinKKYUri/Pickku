const { registUserService,
  registProfileService,
  authenticateUserService,
  getUserSeqService,
  getUserInfoService} = require('../services/authService');

// 회원가입
async function registUserController(req, res) {
  const { userId, userMail, userPhone, userPw  } = req.body;
  try {
    const userData = {
      userId, 
      userMail, 
      userPw, 
      userPhone
    };
    await registUserService(userData);
    res.status(200).json({ message: '회원가입 성공' });
  } catch (error) {
    console.log("error : registUserController")
    res.status(400).json({ message: error.message });
  }
}

//20241124 최진규
//프로필 확인  : 회원가입 후 로그인 할때 프로필 여부 확인
// async function checkUserProfileController(req,res){
//   const {userId} = req.body;
//   try {
//     console.log('test')
//   } catch (error) {
//     console.log("error : checkUserProfileController")
//     res.status(400).json({ message: error.message });
//   }
// }

//20241124 최진규
// userSeq 가져오기
async function getUserSeqController(req,res){
  const {userId} = req.body;
  try {
    const userSeq = await getUserSeqService(userId);
    res.status(200).json({ message: '로그인 성공', userSeq:userSeq });
  } catch (error) {
    console.log("error : getUserSeqController")
    res.status(400).json({ message: error.message });
  }
}

//프로필 저장
async function registProfileController(req,res){
  const {userSeq,userNick,userContent,userImg} = req.body;
  console.log(userNick)
  try{
    const userData = {
      userSeq,
      userNick,
      userContent,
      userImg
    }
    await registProfileService(userData);
    res.status(200).json({ message: '회원가입 성공' });
  }catch(error){
    console.log(error)
    console.log("error : registProfileController")
    res.status(400).json({ message: error.message });
  }
}

// 로그인
async function authenticateUserController(req, res) {
  const { userId, userPw } = req.body;
  try {
    const token = await authenticateUserService(userId, userPw);
    res.status(200).json({ message: '로그인 성공', token });
  } catch (error) {
    console.log("error : authenticateUserController")
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}


//20241124 최규리
// 토큰 검증 후 사용자 정보 넘겨주기
async function verifyTokenController(req, res) {
  try {
    const userId = req.user.id;
    const user = await getUserInfoService(userId);
    res.status(200).json({
      message: '토큰 검증 후 사용자 정보 조회 성공',
      nick: user.profileNick
    });
  } catch (error) {
    console.log("error : verifyTokenController")
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}


module.exports = { registUserController,getUserSeqController, authenticateUserController ,registProfileController, verifyTokenController};