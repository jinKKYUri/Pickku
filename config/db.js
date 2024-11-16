const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({  //mysql.createPool()
    host: process.env.DB_HOST,
    user: process.env.DB_USER, 
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    charset: 'utf8mb4'
});

// 처음 연결 실행
db.connect((err) => {
    if (err) {
      console.error('MySQL 연결 실패:', err.message);
      return;
    }
    console.log('MySQL에 연결되었습니다.');
});

// // 연결 종료를 위한 메서드 정의
// const closeConnection = (done) => {
//     db.end((err) => {
//         if (err) {
//             console.error('MySQL 연결 종료 실패:', er);
//             done && done(err);
//         } else {
//             console.log('MySQL 연결 종료되었습니다.');
//             done && done();
//         }
//     });
// };
module.exports = db;