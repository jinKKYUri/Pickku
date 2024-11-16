const { createUser, getUserByUsername } = require("../models/userModel");
const { createUserProfile, getUserByNickname } = require("../models/profileModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 회원가입 서비스
async function registerUser(userData) {
    const { username, nickname, email, password, phone_number } = userData;

    // 사용자명 중복 확인
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
        throw new Error("이미 존재하는 사용자입니다.");
    }

    // 닉네임 중복 확인
    const existingUserByNickname = await getUserByNickname(nickname);
    if (existingUserByNickname) {
        throw new Error("이미 존재하는 닉네임입니다.");
    }
        
    // 비밀번호 해시 및 사용자 생성
    const hashedPassword = await bcrypt.hash(password, 10);

    // 1단계: users_tb에 사용자 기본 정보 저장
    const newUser = await createUser({ username, email, password: hashedPassword });

    // 2단계: profiles_tb에 프로필 정보 저장 (user_id를 users_tb에서 생성된 id로 설정)
    const profileData = {
        user_id: newUser.id, // users_tb에서 생성된 user_id
        nickname,
        phone_number,
        profile_picture: 'default.png' // 기본 프로필 사진 경로
    };
    await createUserProfile(profileData);
    
    return newUser;
}

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
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        {
        expiresIn: "1h",
        }
    );
    return token;
}

module.exports = { registerUser, authenticateUser };
