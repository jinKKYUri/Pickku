const { registUserService,
  naverAuthService,
  updateProfileService,
  sendVerificationCodeService,
  verifyEmailCodeService,
  getUserSeqService,
  loginService } = require('../services/authService');

// 회원가입
async function registUserController(req, res) {
  console.log(req.body)
  const { mail, nick, password, phone, provider, termsAgreement } = req.body;
  try {
    await registUserService(req.body);
    res.status(200).json({ message: '회원가입 성공' });
  } catch (error) {
    console.log("error : registUserController")
    res.status(400).json({ message: error.message });
  }
}

async function sendVerificationCodeController(req, res) {
  try {
    const { mail } = req.body;
    await sendVerificationCodeService(mail);
    res.status(200).json({ message: '인증번호 발송' });
  } catch (error) {
    console.log("error : sendVerificationCodeController");
    res.status(409).json({ message: error.message });
  }
}

async function verifyEmailCodeController(req, res) {
  try {
    const { mail, code } = req.body;
    await verifyEmailCodeService(mail, code);
    res.status(200).json({ message: '이메일 인증 완료!', isVerified: true });
  } catch (error) {
    console.log("error : verifyEmailCodeController")
    res.status(400).json({ message: error.message });
    //res.status(422).json({ message: "인증 번호가 만료되었습니다." });
  }
}

// 로그인
async function localLoginController(req, res) {
  try {
    const { mail, password } = req.body;
    const result = await loginService(mail, password);
    if (result.token) {
      const token = result.token;
      res.status(200).json({ message: '로그인 성공', data: result });
    }
  } catch (error) {
    console.log("error : authenticateUserController")
    console.log(error);
  }
}
async function naverTokenController(req, res) {
  try {
    const { code, state } = req.body;

    // 서비스 호출
    const result = await naverAuthService(code, state);
    console.log(result);
    res.status(200).json({ ...result });
  } catch (error) {
    console.error("네이버 로그인 오류:", error);
    res.status(500).json({ success: false, message: "네이버 로그인 실패" });
  }
}

//프로필 업데이트(소개글, 이미지, 닉네임)
async function updateProfileController(req, res) {
  try {

    const { nick, intro, img } = req.body;
    await updateProfileService(nick, intro, img);
    res.status(200).json({ message: '회원가입 성공' });
  } catch (error) {
    console.log("error : updateProfileService")
    res.status(400).json({ message: error.message });
  }
}

//20241124 최진규
// userSeq 가져오기
async function getUserSeqController(req, res) {
  const { userId } = req.body;
  try {
    const userSeq = await getUserSeqService(userId);
    res.status(200).json({ message: '로그인 성공', userSeq: userSeq });
  } catch (error) {
    console.log("error : getUserSeqController")
    res.status(400).json({ message: error.message });
  }
}

//20241124 최규리
// 토큰 검증 후 사용자 정보 넘겨주기
// async function verifyTokenController(req, res) {
//   try {
//     const userId = req.user.id;
//     const user = await getUserInfoService(userId);
//     res.status(200).json({
//       message: '토큰 검증 후 사용자 정보 조회 성공',
//       user: user
//     });
//   } catch (error) {
//     console.log("error : verifyTokenController")
//     console.log(error);
//     res.status(400).json({ message: error.message });
//   }
// }


module.exports = {
  registUserController,
  sendVerificationCodeController,
  verifyEmailCodeController,
  getUserSeqController,
  localLoginController,
  naverTokenController,
  updateProfileController
};
