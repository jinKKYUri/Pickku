const db = require("../config/db");

// 사용자 생성 함수(기본 사용자 정보)
async function createUser(userData) {
    const { userId, email, phone, password } = userData;
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO user_table (userid,user_email ,user_phone,user_password) VALUES (?, ?, ?, ?)";
        db.query(query, [userId, email, phone, password], (err, result) => {
            if (err){ reject(err); console.log(err);
            }else resolve({ id: result.insertId, ...userData });
        });
    });
}


// 사용자id 조회 함수
async function getUserByUsername(userId) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM user_table WHERE userId = ?";
        db.query(query, [userId], (err, result) => {
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

async function deleteUser(userId) {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM users_tb WHERE id = ?";
        db.query(query, [userId], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}
module.exports = { createUser, getUserByUsername, deleteUser };
