const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const cors = require("cors");

const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

dotenv.config();  // 환경 변수 로드


const PORT = process.env.PORT || 8001;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin:"*"
}));


// JSON 요청 본문 파싱
app.use(express.json());

// 공개된 라우트 (회원가입, 로그인)
app.use('/auth', authRoutes);

// 인증된 사용자만 접근할 수 있는 보호된 라우트
app.use('/protected', protectedRoutes);


app.get('/', (req, res) => {
    res.send('success');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
