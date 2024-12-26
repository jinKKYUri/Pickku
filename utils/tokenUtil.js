// utils/tokenUtils.js

const jwt = require("jsonwebtoken");

// accessToken 발급 함수
function issueAccessToken(refreshToken, role, SECRET_KEY) {
  const rtInfo = verifyToken(refreshToken, role, SECRET_KEY);
  if (rtInfo.div !== "refreshToken") {
    return false;
  }
  const accessToken = jwt.sign(
    {
      type: "JWT",
      userId: rtInfo.userId,
      serviceName: serviceName,
      div: "accesToken",
    },
    SECRET_KEY,
    {
      algorithm: "HS256",
      expiresIn: "1h",
      issuer: "pickku",
    }
  );
  return accessToken;
}

// refreshToken 발급 함수
function issueRefreshToken(userId, role, SECRET_KEY) {
  const refreshToken = jwt.sign(
    {
      type: "JWT",
      userId: userId,
      role: role,
      div: "refreshToken",
    },
    SECRET_KEY,
    {
      algorithm: "HS256",
      expiresIn: "14d",
      issuer: "pickku",
    }
  );
  return refreshToken;
}

// 토큰 검증
function verifyToken(token, SECRET_KEY) {
  const decoded = jwt.verify(token, SECRET_KEY);

  if (error.name === "TokenExpiredError") {
    return error.name;
  } else {
    return decoded;
  }
}

module.exports = {
  issueRefreshToken,
  issueAccessToken,
  verifyToken,
};
