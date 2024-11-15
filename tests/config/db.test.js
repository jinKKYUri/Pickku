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

describe('MySQL 데이터베이스 test_db 테스트', () => {
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

  test('테스트 테이블 속성(컬럼) 확인', (done) => {
    db.query('SHOW COLUMNS FROM testTable', (err, results) => {
        if (err) {
            done.fail('테이블 구조 조회 실패');
        } else {
            // 컬럼 이름만 추출하여 출력
            const columnNames = results.map(row => row.Field);
            console.log('컬럼 이름:', columnNames);
            expect(results).toBeTruthy();  // 결과가 존재하는지 확인
            done();
        }
    });
  });

  test('데이터베이스 조회', (done) => {
    db.query('select * from testTable;', (err, results) => {
        if (err) {
            done.fail('SELECT 쿼리 실행 실패');
        } else {
            console.log('조회된 데이터:', results);
            expect(results.length).toBeGreaterThan(0);
            done();
        }
    });
  });

  test('데이터 삽입', (done) => {
    const values = 'newTest';
    db.query('INSERT INTO testTable (testName) VALUES (?)', values, (err, result) => {
      if (err) {
        console.error('INSERT 쿼리 실행 실패:', err.message);
        done.fail(err);
      }
      console.log('INSERT 쿼리 실행 성공');
      insertedId = result.insertId; // 삽입된 ID 저장
      done();
    });
  });

  test('데이터 삭제', (done) => {
    db.query('DELETE FROM testTable WHERE testSeq = (?)', [insertedId], (err, result) => {
      if (err) {
        console.error('데이터 삭제 실패:', err.message);
        done.fail(err);
      }
      console.log('삭제되는 ID:', insertedId);
      done();
    });
  });

  test('AUTO_INCREMENT 값을 재설정', (done) => {
    //기본 [ { testSeq: 1, testName: 'test' } ]값만 두고 삭제했기 때문에 auto 값 재설정
    db.query('ALTER TABLE testTable AUTO_INCREMENT = 2', (err) => { 
      if (err) {
        console.error('AUTO_INCREMENT 재설정 실패:', err);
        done.fail(err);
      } else {
        console.log('AUTO_INCREMENT 값 재설정 완료');
        done();
      }
    });
  });
});