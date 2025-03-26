const db = require("../config/db");


// 20250216 최진규
// 사용자 계정 생성 함수
async function signUpModel({ mail, provider, providerId, password }) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO userTable (mail, provider, provider_id, password) VALUES (?, ?, ?, ?)";
        db.query(query, [mail, provider, providerId, password], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve({ id: result.insertId, mail, provider, providerId });
            };
        });
    });
}


// 20250216 최진규
// 초기 프로필 생성 함수
async function registProfileModel(userId ,nick,intro,imageId) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO profileTable (user_id, nick,intro,image_id) VALUES (?,?,?,?)";
        db.query(query, [userId ,nick,intro,imageId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve({ id: result.insertId, nick })
            };
        });
    });
}

// 20250301 최진규
// 이미지 등록 함수
async function registImageModel(userId,imagePath,type) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO imageTable (user_id,image_path,type) VALUES (?,?,?,?)";
        db.query(query, [userId ,imagePath,type], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve({ id: result.insertId, imagePath })
            };
        });
    });
}

//250301 최진규
async function getImageModel(imageId){
    return new Promise((resolve,reject)=>{
        const query = "SELECT user_id,image_path,type FROM imageTable WHERE image_id = ?"
        db.query(query,[imageId], (err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result[0])
            }
        })
    })
}

// 20250220 최규리
// 약관 동의 정보 저장 함수
async function registUserTermModel({ userId, termsAgreement }) {
    const promises = Object.keys(termsAgreement).map((termId) => {

        return new Promise((resolve, reject) => {
            const agreed = termsAgreement[termId] ? 1 : 0;
            const query = `INSERT INTO userTermTable (user_id, term_id, agreed) 
                    VALUES (?, ?, ?) 
                    ON DUPLICATE KEY UPDATE agreed = ?`;
            db.query(query, [userId, termId, agreed], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    });

    try {
        // 모든 약관 항목에 대해 처리 완료 후 응답
        await Promise.all(promises);  // 모든 비동기 작업이 완료될 때까지 기다림
        return { message: '약관 동의 정보 저장 완료' };
    } catch (error) {
        throw error;
    }
}


// 20250220 최규리
// 핸드폰 인증 정보 저장 함수
async function registPhoneAuthModel({ userId, phone }) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO phoneAuthTable  (user_id, phone) VALUES (?, ?)";
        db.query(query, [userId, phone], (err, result) => {
            if (err) {
                reject(err);
                console.log(err);
            } else {
                resolve({ id: result.insertId, ...userData })
            };
        });
    });
}

// 20250220 최규리
// 프로필 업데이트 함수
async function updateProfileModel({ userId, nick, intro, imageId }) {
    return new Promise((resolve, reject) => {
        const query = `
        UPDATE profileTable
        SET nick = ?, intro = ?, image_id = ?
        WHERE user_id = ?
      `;
        db.query(query, [nick, intro, imageId, userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


// 20250216 최진규
// 메일로 계정 조회 함수
async function getUserByMailModel(mail) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT u.*, p.*
            FROM userTable u
            LEFT JOIN profileTable p ON u.id = p.user_id
            WHERE u.mail = ?`;
        db.query(query, [mail], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            if (result.length > 0) {
                resolve(result[0]);
            }
            else {
                resolve(null);
            }

        });
    });
}

// 20250220 최규리
// user 테이블에서 seq 값을 찾는 함수
async function getUserSeqByNick(nick) {
    return new Promise((resolve, reject) => {
        const query = "SELECT seq FROM userTable WHERE nick = ?";
        db.query(query, [nick], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0]?.seq); // seq 값 반환
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
            } else {
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
            if (result.length > 0) {
                resolve(result[0]);
            }
            else {
                resolve(false);
            }
        });
    });
}

//사용자 삭제 함수
async function deleteUserModel(mail) {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM userTable WHERE mail = ?";
        db.query(query, [mail], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}

module.exports = {
    signUpModel,
    registProfileModel,
    registImageModel,
    registUserTermModel,
    registPhoneAuthModel,
    updateProfileModel,
    getUserByMailModel,
    getUserSeqByNick,
    deleteUserModel,
};
