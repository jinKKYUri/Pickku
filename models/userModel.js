const db = require("../config/db");

// 사용자 계정 생성 함수
async function registUserModel(userData) {
    console.log("userModel : registUserModel")
    const { userId, userMail, userPhone, userPw } = userData;
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO userTable (userId,userMail ,userPhone,userPw) VALUES (?, ?, ?, ?)";
        db.query(query, [userId, userMail, userPhone, userPw], (err, result) => {
            if (err){ reject(err);
            }else resolve({ id: result.insertId, ...userData });
        });
    });
}


// 20241124 최진규
// 사용자 계정 정보 확인 함수(중복 방지)
async function getUserIdModel(userId) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM userTable WHERE userId = ?";
        db.query(query, [userId], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            if (result.length > 0) resolve(result[0]);
            else resolve(false);
        });
    });
}

//20241124 최진규
// 사용자 닉네임 조회함수(중복 방지)
async function getUserNickModel(userNick) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM userProfileTable WHERE profileNick = ?";
        db.query(query, [userNick], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            if (result.length > 0) resolve(true);
            else resolve(false);
        });
    });
}


// 20241124 최진규
// 사용자 프로필 정보 확인 함수
async function getUserProfileModel(userSeq) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM userProfileTable WHERE userSeq = ?";
        db.query(query, [userSeq], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            if (result.length > 0){
                resolve(result);  
            }else{
                resolve(false);  
            }
        });
    });
}

// 초기 프로필 생성 함수(사용자 프로필 정보)
async function registProfileModel(userData) {
    const { userNick,userContent,userImg,userSeq } = userData;
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO userProfileTable (profileNick,profileContent,userSeq) VALUES (?, ?,?)";
        db.query(query, [userNick, userContent,userSeq], (err, result) => {
            if (err){ reject(err); console.log(err);
            }else resolve({ id: result.insertId, ...userData });
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
module.exports = { registUserModel, getUserIdModel,registProfileModel ,deleteUserModel,getUserProfileModel,getUserNickModel };
