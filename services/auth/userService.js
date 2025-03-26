const {
  signUpModel,
  registProfileModel,
  registUserTermModel,
  registPhoneAuthModel,
  updateProfileModel,
  getUserByMailModel,
} = require("../../models/userModel.js");

const {
  issueRefreshToken,
  issueAccessToken,
  verifyToken,
} = require("../../utils/tokenUtil.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

// 회원가입 서비스
async function signUpService(data) {
  const { mail, password, provider,providerId, termsAgreement } = data;

  let providerValue;

  if (provider === "LOCAL") {
    providerValue = 0;
  } else if (provider === "NAVER") {
    providerValue = 1;
  } else if (provider === "GOOGLE") {
    providerValue = 2;
  } else if (provider === "KAKAO") {
    providerValue = 3;
  }

  // 사용자 이메일 중복 확인
  const existingUser = await getUserByMailModel(mail);
  if (existingUser) {
    throw new Error("이미 가입된 이메일입니다.");
  }

  // 비밀번호 해싱 (소셜 회원가입할 경우엔 비밀번호가 없음)
  const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

  // 1단계: userTable에 사용자 기본 정보 저장
  const newUser = await signUpModel({
    mail,
    provider,
    providerId,
    password: hashedPassword
  });


  // 2단계 :  profileTable에 사용자 프로필 저장
  // await registProfileModel({
  //   userId: newUser.id,
  //   nick
  // });
  // console.log("프로필 정보 저장 완료");


  // 3단계 :  userTermTable에 약관 동의 정보 저장
  // await registUserTermModel({
  //   userId: newUser.insertId,
  //   termsAgreement,
  // });
  // console.log("약관 동의 정보 저장 완료");

  // 4단계 : phoneAuthTable에 핸드폰 인증 확인 정보 저장 
  // await registPhoneAuthModel({
  //   userId: newUser.insertId,
  //   phone
  // });
  // console.log("핸드폰 정보 저장 완료");

  return newUser;
}

async function registProfileService(userId,nick, intro, imageId){
  try{
    await registProfileModel(userId ,nick,intro,imageId);
  }catch(error){
    throw new Error("이미 가입된 이메일입니다.");
  }

}

async function registImageService(image){
  try{
    // 이미지 파일은 따로 저장하고 이미지명만 model로 넘겨서 테이블에 경로 저장
    // 경로는 절대 경로로 지정 필요
    await registImageModel(image);
  }catch(error){
    throw new Error("이미 가입된 이메일입니다.");
  }
}


// 이메일 중복 확인 및 인증번호 발송 서비스
async function sendVerificationCodeService(mail) {
  const emailExist = await getUserByMailModel(mail);
  if (emailExist) {
    throw new Error("이미 가입된 이메일입니다.");
  }
  // 인증번호 발송 (랜덤 인증번호 생성)
  //const verificationCode = generateRandomVerificationCode();
  //인증번호 DB에 저장?? 5분간?
}

// 인증번호 확인 서비스
async function verifyEmailCodeService(mail, enteredCode) {
  const storedCode = "1234";
  //DB에서 email에 대한 인증 번호랑 비교
  //const storedCode = await (email);
  if (storedCode !== enteredCode) {
    throw new Error('인증 번호가 잘못되었습니다.');
  }
}


//네이버 로그인
async function naverAuthService(code, state) {
  // console.log(code)
  // console.log(state)
  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  const tokenUrl = "https://nid.naver.com/oauth2.0/token";

  const params = {
    grant_type: "authorization_code",
    client_id: clientId,
    client_secret: clientSecret,
    code: code,
    state: state,
  };

  try {
    // 1️. 네이버 OAuth 토큰 요청
    const tokenResponse = await axios.post(tokenUrl, null, { params });
    // console.log(tokenResponse.data);
    // console.log(tokenResponse.data[1]);
    const { access_token,refresh_token, token_type, expires_in } = tokenResponse.data;

    // 2️. 네이버 사용자 정보 요청
    const userResponse = await axios.get("https://openapi.naver.com/v1/nid/me", {
      headers: {
        Authorization: `Bearer ${access_token}`
      },
    });
    //const userData = userResponse.data.response;
    const { id, email, nickname, profile_image, mobile, mobile_e164 } = userResponse.data.response;
    // 3️. 약관 동의 정보 리스트 가져오기
    const termsResponse = await axios.get(`https://openapi.naver.com/v1/nid/agreement`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    //console.log(termsResponse.data.agreementInfos); -> (termCode, clientId, agreeDate)

    // 4️. 새로운 유저면 DB에 저장
    const existingUser = await getUserByMailModel(email);
    if (!existingUser) {
      const data = {
        mail: email,
        nick: nickname,
        password: null,
        phone: mobile.replaceAll('-', ''),
        provider: 1,
        providerId: id,
        termsAgreement: termsResponse
      }
      await signUpService(data);
    }
    // 5️. 필요한 데이터만 반환
    return {
      success: true,
      user: {
        id,
        mail: email,
        nick: nickname,
        profile_image,
      },
      accessToken: access_token,
      expiresIn: expires_in,
      provider: 'NAVER'
    };
  } catch (error) {
    console.error("네이버 OAuth 오류:", error);
    throw new Error("네이버 로그인 실패");
  }
}


//프로필 업데이트(수정 버튼 눌렀을 때)
// 닉네임은 중복확인하는 버튼은 따로 있다고 가정하에 진행
async function updateProfileService({ nick, intro, imageId }) {
  // 1단계: 닉네임으로 seq 값 찾기
  const userSeq = await getUserSeqByNick(nick);
  if (!userSeq) {
    throw new Error("사용자를 찾을 수 없습니다.");
  }

  // 2단계: 프로필 수정 (UPDATE)
  const updatedProfile = await updateProfileModel({
    userSeq,  // userSeq를 사용하여 프로필을 업데이트
    nick,
    intro,
    imageId,
  });

  return updatedProfile;
}


// userId 조회 함수
async function getUserSeqService(userId) {
  const userSeq = await getUserIdModel(userId);
  if (!userSeq) {
    throw new Error("사용자를 찾을 수 없습니다.");
  }
  return userSeq.userSeq;
}

// 로그인 서비스
async function loginService(mail, password) {
  const userAccount = await getUserByMailModel(mail);
  console.log(userAccount);
  if (!userAccount) {
    throw new Error("사용자를 찾을 수 없습니다.");
  }

  // 비밀번호 확인
  const isMatch = await bcrypt.compare(password, userAccount.password);
  if (!isMatch) {
    throw new Error("잘못된 비밀번호입니다.");
  }
  console.log(userAccount);
  // JWT 토큰 생성
  const token = jwt.sign(
    {
      id: userAccount.id,
      mail: userAccount.mail,
      nick: userAccount.nick,
      role: userAccount.type,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return {
    token: token,
    provider: 'LOCAL'
  };
}

function generateRandomVerificationCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';

  for (let i = 0; i < 10; i++) { // 10자리 인증번호 생성
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return code;
}

// async function test(){
//   const password = 'Qwer1234!@';
//   const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
//   console.log(hashedPassword);
// }

// test();


module.exports = {
  signUpService,
  naverAuthService,
  registProfileService,
  registImageService,
  loginService,
  sendVerificationCodeService,
  verifyEmailCodeService,
  updateProfileService,
  getUserSeqService
};
