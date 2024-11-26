// utils/tokenUtils.js

const jwt = require("jsonwebtoken");

// accessToken 발급 함수
async function issueAccessToken(refreshToken, role, SECRET_KEY) {
  try {
    const rtInfo = await verifyToken(refreshToken, role, SECRET_KEY);
    if (rtInfo.div !== 'refreshToken') {
      return false;
    }
    accessToken = jwt.sign(
      {
        type: "JWT",
        userId: rtInfo.userId,
        serviceName: serviceName,
        div: "accesToken"
      },
      SECRET_KEY,
      {
        algorithm: "HS256",
        expiresIn: "1h",
        issuer: "edc3665",
      }
    );
    const decoded = await verifyToken(accessToken, role, SECRET_KEY)
    // console.log(decoded);
    if (decoded.exp < rtInfo.exp && rtInfo.role == decoded.role) {
      return accessToken;
    } else {
      return false;
    }
  } catch (error) {
    console.log("makeAccessToken 오류 : " + error);
    return false;
  }
}

// refreshToken 발급 함수
async function issueRefreshToken(userId, role, SECRET_KEY) {
  try {
    const refreshToken = jwt.sign(
      {
        type: "JWT",
        userId: userId,
        role: role,
        div: "refreshToken"
      },
      SECRET_KEY,
      {
        algorithm: "HS256",
        expiresIn: "14d",
        issuer: "edc3665",
      }
    );
    const decodedToken = await verifyToken(refreshToken, serviceName, SECRET_KEY);
    // const expiresAt = await setTokenTime(decodedToken.exp);
    if (refreshToken !== false) {
      return refreshToken;
    } else {
      return false;
    }
  } catch (error) {
    console.error("makeRefreshToken 오류:", error.name);
    return false;
  }
}

// 토큰 검증
async function verifyToken(token, serviceName, SECRET_KEY) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (decoded && decoded.serviceName == serviceName) {
      return decoded;
    } else {
      return false;
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return error.name;
    } else {
      return false;
    }

  }
}

// db에 적재될 토큰의 의료일자 yyyy-mm-dd hh:mm:ss 형식으로 변환
async function setTokenTime(unixTimestamp) {
  try {
    if (unixTimestamp) {
      const date = new Date(unixTimestamp * 1000); // Unix 타임스탬프는 초 단위이므로 1000을 곱해 밀리초로 변환
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고, 두 자리로 패딩
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      return formattedDate;
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}

// async function main() {
//   const rt = await issueRefreshToken('jk3469', 'logservice', '1d', '4124124');
//   console.log("rt : " + rt);
//   const vt1 = await verifyToken(rt, 'logservice', '4124124');
//   console.log(vt1);
//   console.log(" rt exp : " + await setTokenTime(vt1.exp))

//   const at = await issueAccessToken(rt, 'logservice', '2m', '4124124');
//   console.log('at : ' + at);
//   const vt2 = await verifyToken(at, 'logservice', '4124124');
//   console.log(vt2);
//   console.log(" at exp : " + await setTokenTime(vt2.exp))
// }

// main();

module.exports = {
  issueRefreshToken,
  issueAccessToken,
  verifyToken,
  setTokenTime,
};
