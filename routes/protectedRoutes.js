// routes/protectedRoutes.js
const express = require('express');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

// 인증된 사용자만 접근할 수 있는 라우트
router.get('/profile', authenticate, (req, res) => {
  // 인증된 사용자만 접근할 수 있음
  res.status(200).json({ message: '프로필 정보', user: req.user });
});

module.exports = router;