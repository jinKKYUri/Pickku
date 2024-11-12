// server/testConnection.js
const db = require('../config/testdb');

// 간단한 쿼리를 통해 연결을 테스트합니다
db.query('select * from testTable;', (err, results) => {
  if (err) {
    console.error('테스트 쿼리 실행 실패:', err.message);
  } else {
    console.log('테스트 쿼리 결과:', results);
  }
  // 테스트 후 연결 종료
  db.end();
});

const values = 'test2'

db.query('insert into testTable (testName) values(?)', values, (err, results) => {
  if (err) {
    console.error('INSERT 쿼리 실행 실패:', err.message);
  } else {
    console.log('INSERT 쿼리 실행 성공:', results);
    console.log('삽입된 ID:', results.insertId); // 자동 증가 ID를 확인할 수 있습니다
  }

  // 테스트 후 연결 종료
  db.end();
});