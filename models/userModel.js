const db = require("../config/db");


// 20250216 최진규
// 계정 생성 함수
async function registUserModel(mail, provider, providerId, password) {
    // const {mail, provider, providerId, password} =userData;
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO userTable (mail,provider ,provider_id,password) VALUES (?, ?, ?, ?)";
        db.query(query, [mail, provider, providerId, password], (err, result) => {
            if (err) {
                reject(err);
            } else {
                // resolve({ id: result.insertId, ...userData });
                console.log(result.insertId)
                resolve({ id: result.insertId});
            }
        });
    });
}

// 20250216 최진규
// 메일로 계정 조회 함수
async function getUserByMailModel(mail) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM userTable WHERE mail = ?";
        db.query(query, [mail], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            if (result.length > 0) {
                resolve(result[0]);
            }
            else{
                resolve(false);
            }
        });
    });
}


// 20250216 최진규
// 아이디로 계정 조회 함수
async function getUserByIdModel(userId) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM userTable WHERE id = ?";
        db.query(query, [userId], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            if (result.length > 0) {
                resolve(result[0]);
            }
            else {
                resolve(false);
            }
        });
    });
}


// 20250216 최진규
// 프로필 생성 함수
async function registProfileModel(userId, nick, intro, imageId) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO profileTable (user_id,nick,intro,image_id) VALUES (?, ?,?)";
        db.query(query, [userId, nick, intro, imageId], (err, result) => {
            if (err) {
                reject(err);
                console.log(err);
            } else {
                // resolve({ id: result.insertId, ...userData });
                resolve({ id: result.insertId});
            }
        });
    });
}

//20250216 최진규
// 닉네임 중복 확인
async function getProfileByNickModel(nick) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM profileTable WHERE nick = ?";
        db.query(query, [nick], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            if (result.length > 0) {
                resolve(result[0]);
            } else{
                resolve(false);  
            }
        });
    });
}

// 20250216 최진규
// 프로필 조회 함수
async function getProfileModel(userId) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM profileTable WHERE user_id = ?";
        db.query(query, [userId], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            if (result.length > 0){
                resolve(result[0]);
            }
            else{
                resolve(false);
            }
        });
    });
}




// 20241126 최규리
//사용자 정보 가져오는 함수
//닉네임만 가져올지 아니면 사용자 정보 전체를 가져올지 고민중
//(모든 정보를 하나씩 가져오려면 함수가 너무 많아질 것 같아서)
// async function getUserModel(userId) {
//     return new Promise((resolve, reject) => {
//         const query =
//             `SELECT *
//             FROM userTable
//             INNER JOIN userProfileTable
//             ON userTable.userSeq = userProfileTable.userSeq
//             WHERE userTable.userId = ?`;
//         db.query(query, [userId], (err, result) => {
//             if (err) reject(err);
//             else resolve(result[0]);
//         });
//     });
// }

//사용자 삭제 함수
async function deleteUserModel(userId) {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM userTable WHERE userId = ?";
        db.query(query, [userId], (err, result) => {
            if (err) { 
                reject(err); 
            }
            else{
                resolve(result);  
            }
        });
    });
}


async function test() {

}

module.exports = {
    registUserModel,
    getUserByMailModel,
    getUserByIdModel,
    registProfileModel,
    getProfileByNickModel,
    getProfileModel
};
