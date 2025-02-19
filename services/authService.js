const {
  getUserIdModel,
  registUserModel,
  getUserNickModel,
  registProfileModel,
  getUserModel,
  getUserByMailModel,
} = require("../models/userModel");
const {
  issueRefreshToken,
  issueAccessToken,
  verifyToken,
} = require("../utils/tokenUtil.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 회원가입 서비스
async function registUserService(userData) {
  const { mail, provider, providerId, password } = userData;

  // 사용자 아이디 확인
  const existingUserId = await getUserByMailModel(mail);
  if (existingUserId) {
    throw new Error("이미 가입된 메일입니다.");
  }else{
    console.log("가입가능")
  }
  // 비밀번호 해시 및 사용자 생성
  const hashedPassword = await bcrypt.hash(password, 10);
  // 1단계: users_tb에 사용자 기본 정보 저장
  const newUser = await registUserModel({
    mail,
    provider,
    providerId,
    password: hashedPassword,
  });
  return newUser;
}

//초기 프로필 등록 서비스
async function registProfileService(userId, nick, intro, imageId) {
  // 사용자 닉네임 중복 확인
  const existingUserNick = await getProfileByNickModel(nick);
  if (existingUserNick) {
    throw new Error("이미 존재하는 닉네임입니다.");
  }

  const newProfile = await registProfileModel({
    userId,
    nick,
    intro,
    imageId,
  });

  return newProfile;
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
  console.log(mail)
  if (!userAccount) {
    throw new Error("사용자를 찾을 수 없습니다.");
  }
  // 비밀번호 확인
  const isMatch = await bcrypt.compare(password, userAccount.password);
  if (!isMatch) {
    throw new Error("잘못된 비밀번호입니다.");
  }

  // JWT 토큰 생성
  const token = jwt.sign(
    {
      id: userAccount.id,
      email: userAccount.mail,
      nick: userAccount.nick,
      role: userAccount.type,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return { token: token };
}

//20241126 최규리
//user 조회 함수
async function getUserInfoService(userId) {
  const user = await getUserModel(userId);
  if (!user) {
    throw new Error("사용자를 찾을 수 없습니다.");
  }
  return user;
}

module.exports = {
  registUserService,
  getUserSeqService,
  loginService,
  registProfileService,
  getUserInfoService,
};
