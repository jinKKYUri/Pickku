//const db = require('../config/db');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
// test_db 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'test_db', // test_db 사용
  waitForConnections: true,
});

describe('MySQL 데이터베이스 user_db 테스트', () => {
  let insertedId; // 삽입된 ID를 저장할 변수

  beforeAll((done) => {
    // test_db 연결 시도
    db.connect((err) => {
        if (err) {
            done.fail('test_db 데이터베이스 연결 실패');
        } else {
            console.log('test_db에 성공적으로 연결되었습니다.');
            done();
        }
    });
  }); 

  afterAll((done) => {
    // 연결 종료
    db.end((err) => {
        if (err) {
            done.fail('test_db 연결 종료 실패');
        } else {
            console.log('test_db 연결 종료되었습니다.');
            done();
        }
    });
  });

  test('DB 모든 테이블 확인', (done) => {
    db.query('SHOW TABLES', (err, results) => {
        if (err) {
            done.fail('테이블을 확인할 수 없습니다');
        } else {
            console.log('테이블:', results);
            done();
        }
    });
  });

  test('user테이블 조회', (done) => {
    db.query('select * from userTable;', (err, results) => {
        if (err) {
            done.fail('SELECT 쿼리 실행 실패');
        } else {
            console.log('조회된 데이터:', results);
            expect(results.length).toBeGreaterThan(0);
            done();
        }
    });
  });
});