const { signUpService, updateProfileService,naverAuthService } = require("../../services/auth/userService");


// 로컬 회원가입
async function localSignUpController(req, res) {
    try {
        const { mail, password, provider, termsAgreement } = req.body;
        const data = {
          mail: mail, 
          password : password, 
          provider : provider, 
          termsAgreement : termsAgreement
        }
        await signUpService(data);
        res.status(200).json({ message: '회원가입 성공' });
    } catch (error) {
        console.log("error : localSignUpController")
        res.status(400).json({ message: error.message });
    }
}

//프로필 등록(소개글, 이미지, 닉네임)
async function setProfileController(req, res) {
  try {
    const { userId,nick,intro,image } = req.body;
    
    let imageId;
    if(image){
      imageId = await registImageService(image);
    }
    await registProfileService(userId,nick, intro, imageId);
    res.status(200).json({ message: '회원가입 성공' });
  } catch (error) {
    console.log("error : setProfileController")
    res.status(400).json({ message: error.message });
  }
}

// 네이버 회원가입
async function naverSignUpController(req, res) {
    try {
        const { code, state } = req.body;
        console.log(code)
        console.log(state)
        // 서비스 호출
        const result = await naverAuthService(code, state);
        console.log(result);
        res.status(200).json({ ...result });
    } catch (error) {
        console.error("네이버 로그인 오류:", error);
        res.status(500).json({ success: false, message: "네이버 로그인 실패" });
    }
}

// 구글 회원가입
async function googleSignUpController(req, res) {
    try {
        const { mail, nick, password, phone, provider, termsAgreement } = req.body;
        await registUserService(req.body);
        res.status(200).json({ message: '회원가입 성공' });
    } catch (error) {
        console.log("error : googleSignUpController")
        res.status(400).json({ message: error.message });
    }
}

// 카카오 회원가입
async function kakaoSignUpController(req, res) {    
    try {
        const { mail, nick, password, phone, provider, termsAgreement } = req.body;
        await registUserService(req.body);
        res.status(200).json({ message: '회원가입 성공' });
    } catch (error) {
        console.log("error : kakaoSignUpController")
        res.status(400).json({ message: error.message });
    }
}

//프로필 세팅
async function registProfileController(req,res){
    try{
        const { mail } = req.body;
        await sendVerificationCodeService(mail);
        res.status(200).json({ message: '인증번호 발송' });        
    }catch(error){
        res.status(409).json({ message: error.message });
    }
}

//프로필 업데이트(소개글, 이미지, 닉네임)
async function registProfileController(req, res) {
    try {
      console.log("컨트롤러")
      const { nick, intro, img } = req.body;
      await updateProfileService(nick, intro, img);
      res.status(200).json({ message: '회원가입 성공' });
    } catch (error) {
      console.log("error : updateProfileService")
      res.status(400).json({ message: error.message });
    }
  }
  

// 이메일 인증 코드 전송
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
  
  
  // 인증 코드 확인
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

module.exports={
    localSignUpController,
    naverSignUpController,
    googleSignUpController,
    registProfileController,
    kakaoSignUpController,
    setProfileController,
    sendVerificationCodeController,
    verifyEmailCodeController
}