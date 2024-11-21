const { createUser, getUserByUsername } = require("../models/userModel");
const { createUserProfile, getUserByNickname } = require("../models/profileModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 회원가입 서비스
async function registerUser(userData) {
    const { userId, email, password, phone } = userData;

    // 사용자명 중복 확인
    const existingUser = await getUserByUsername(userId);
    if (existingUser) {
        throw new Error("이미 존재하는 아이디입니다.");
    }

    // 비밀번호 해시 및 사용자 생성
    const hashedPassword = await bcrypt.hash(password, 10);

    // 1단계: users_tb에 사용자 기본 정보 저장
    const newUser = await createUser({ userId, email, phone, password: hashedPassword });


    return newUser;
}

// 프로필 서비스
// async function setProfile(nickname,content,img){

//}

// 로그인 서비스
async function authenticateUser(username, password) {
    // 사용자 조회
    const user = await getUserByUsername(username);
    if (!user) {
        throw new Error("사용자를 찾을 수 없습니다.");
    }

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("잘못된 비밀번호입니다.");
    }

    // JWT 토큰 생성
    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );
    return token;
}

module.exports = { registerUser, authenticateUser };
