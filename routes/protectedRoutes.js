const express = require('express');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorize } = require("../middlewares/roleMiddleware");

const router = express.Router();

// 모든 라우트에 인증 미들웨어 적용 (토큰 확인)
router.use(authenticate);

// 모든 인증된 사용자 접근 가능(user, author, admin 다 가능하므로 토큰만 있으면 가능하게)
router.get('/profile', (req, res) => {
  res.status(200).json({ message: '프로필 정보', user: req.user });
});

// 작성자와 관리자만 접근 가능
router.post("/create-post", authorize(["author", "admin"]), (req, res) => {
  res.status(200).json({ message: "포스트 작성 페이지" });
});

// 관리자만 접근 가능
router.get("/admin", authorize(["admin"]), (req, res) => {
  res.status(200).json({ message: "관리자 페이지" });
});
module.exports = router;