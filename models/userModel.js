const db = require("../config/db");

// 사용자 생성 함수(기본 사용자 정보)
async function createUser(userData) {
    const { username, email, password } = userData;
    
    console.log(userData);
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO users_tb (username, email, password) VALUES (?, ?, ?)";
        db.query(query, [username, email, password], (err, result) => {
        if (err) reject(err);
        else resolve({ id: result.insertId, ...userData });
        });
    });
}


// 사용자id 조회 함수
async function getUserByUsername(username) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM users_tb WHERE username = ?";
        db.query(query, [username], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            console.log(result);
            if (result.length > 0) resolve(true);
            else resolve(false);
        });
    });
}

module.exports = { createUser, getUserByUsername };
