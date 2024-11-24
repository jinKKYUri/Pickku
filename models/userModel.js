const db = require("../config/db");

// 사용자 생성 함수(기본 사용자 정보)
async function registUserModel(userData) {
    console.log("userModel : registUserModel")
    const { userId, userMail, userPhone, userPw } = userData;
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO userTable (userId,userMail ,userPhone,userPw) VALUES (?, ?, ?, ?)";
        db.query(query, [userId, userMail, userPhone, userPw], (err, result) => {
            if (err){ reject(err); console.log(err);
            }else resolve({ id: result.insertId, ...userData });
        });
    });
}

// 사용자 아이디 조회 함수
async function getUserIdModel(userId) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM userTable WHERE userId = ?";
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

// 프로필 생성 함수(사용자 프로필 정보)
async function registProfileModel(userData) {
    const { userNick,userContent,userImg } = userData;
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO userProfileTable (userNick,userContent ,userImg) VALUES (?, ?, ?)";
        db.query(query, [userNick, userContent, userImg], (err, result) => {
            if (err){ reject(err); console.log(err);
            }else resolve({ id: result.insertId, ...userData });
        });
    });
}


//사용자 닉네임 조회 함수
async function getUserNickModel(userNick){
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM userProfileTable WHERE profileNick = ?";
        db.query(query, [userNick], (err, result) => {
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

//사용자 삭제 함수
async function deleteUserModel(userId) {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM usersTable WHERE userId = ?";
        db.query(query, [userId], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}
module.exports = { registUserModel, getUserIdModel,registProfileModel ,deleteUserModel,getUserNickModel };
