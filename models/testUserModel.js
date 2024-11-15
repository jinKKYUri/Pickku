// models/userModel.js
const db = require("../config/testdb");
const bcrypt = require("bcrypt");

// 사용자 생성 함수
async function testCreateUser(username, hashedPassword) {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(query, [username, hashedPassword], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// 사용자 조회 함수
async function testGetUserByUsername(username) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], (err, results) => {
      if (err) reject(err);
      else resolve(results[0]);
    });
  });
}

module.exports = { testCreateUser, testGetUserByUsername };
