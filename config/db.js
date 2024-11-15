// config/db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');

// 환경변수 로드
dotenv.config({ path: '../.env' });

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST,       // 데이터베이스 호스트
  user: process.env.DB_USER,       // 데이터베이스 사용자
  password: process.env.DB_PASS,   // 데이터베이스 비밀번호
  database: process.env.DB_NAME    // 데이터베이스 이름
});

// .env에서 불러온 값을 출력해 확인합니다.
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
console.log("DB_NAME:", process.env.DB_NAME);

// 연결 실행
db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err.message);
    return;
  }
  console.log('MySQL에 연결되었습니다.');
});

module.exports = db;