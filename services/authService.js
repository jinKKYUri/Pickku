// services/authService.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, getUserByUsername } = require("../models/userModel");

// 회원가입 서비스
async function registerUser(username, password) {
  // 사용자 조회
  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    throw new Error("이미 존재하는 사용자입니다.");
  }

  // 비밀번호 해시 및 사용자 생성
  const hashedPassword = await bcrypt.hash(password, 10);
  return await createUser(username, hashedPassword);
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
