const jwt = require('jsonwebtoken');

// JWT 토큰 검증 미들웨어
function authenticate(req, res, next) {
  // Authorization 헤더에서 토큰을 가져옵니다.
  const token = req.headers['authorization']?.split(' ')[1]; // "Bearer <token>"에서 <token>만 가져옴
  
  //토큰 없을 시에는 프론트에서 이미 걸러져서 넘어오는데데 혹시 몰라서 적어놓음음
  if (!token) {
    return res.status(401).json({ message: '토큰이 없습니다. 로그인 해주세요.' });
  }

  try {
    // JWT 토큰을 검증하고, 토큰에 담긴 정보를 디코딩합니다.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 디코딩된 정보를 req.user에 추가합니다.
    req.user = decoded;
    next(); // 인증 성공 시, 요청을 계속 처리합니다.
  } catch (error) {
    return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
  }
}

module.exports = { authenticate };