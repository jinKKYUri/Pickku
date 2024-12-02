const { getUserIdModel,
    registUserModel,
    getUserNickModel,
    registProfileModel,
    getUserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 회원가입 서비스
async function registUserService(userData) {

    const { userId, userMail, userPw, userPhone } = userData;

    // 사용자 아이디 확인
    const existingUserId = await getUserIdModel(userId);
    if (existingUserId) {
        throw new Error("이미 존재하는 아이디입니다.");
    }
    console.log("아이디 조회 완료")
    // 비밀번호 해시 및 사용자 생성
    const hashedPassword = await bcrypt.hash(userPw, 10);
    console.log("hash : " + hashedPassword)
    // 1단계: users_tb에 사용자 기본 정보 저장
    const newUser = await registUserModel({ userId, userMail, userPhone, userPw: hashedPassword });


    return newUser;
}

//초기 프로필 등록 서비스
async function registProfileService(userData) {
    const { userSeq,userNick, userContent, userImg } = userData;

    // 사용자 닉네임 중복 확인
    const existingUserNick = await getUserNickModel(userNick);
    if (existingUserNick) {
        throw new Error("이미 존재하는 닉네임입니다.");
    }

    const newProfile = await registProfileModel({userSeq,userNick,userContent,userImg});

    return newProfile;
}


//userSeq 조회 함수
async function getUserSeqService(userId){
    const userSeq = await getUserIdModel(userId);
    if(!userSeq){
        throw new Error("사용자를 찾을 수 없습니다.");
    }
    return userSeq.userSeq;
}



// 로그인 서비스
async function authenticateUserService(userId, password) {
    // 사용자 조회
    const userInfo = await getUserIdModel(userId);
    if (!userInfo) {
        throw new Error("사용자를 찾을 수 없습니다.");
    }
    console.log(password);
    console.log(userInfo.userPw);
    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, userInfo.userPw);
    if (!isMatch) {
        throw new Error("잘못된 비밀번호입니다.");
    }
    // JWT 토큰 생성
    const token = jwt.sign(
        { id: userInfo.userId, role: userInfo.userType },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );
    return token;
}

//20241126 최규리
//user 조회 함수
async function getUserInfoService(userId) {
    const user = await getUserModel(userId);
    if(!user){
        throw new Error("사용자를 찾을 수 없습니다.");
    }
    return user;
}


module.exports = { registUserService,getUserSeqService ,authenticateUserService, registProfileService, getUserInfoService };
