const db = require("../config/db");

// 사용자 생성 함수(프로필 정보)
async function createUserProfile(profileData) {
    const { user_id, nickname, phone_number, profile_picture } = profileData;
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO profiles_tb (user_id, nickname, phone_number, profile_picture) VALUES (?, ?, ?, ?)";
        db.query(query, [user_id, nickname, phone_number, profile_picture], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}
  

// 닉네임 조회
async function getUserByNickname(nickname) {
    console.log("rth");
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM profiles_tb WHERE nickname = ?";
        db.query(query, [nickname], (err, result) => {
            if (err) reject(err);
            else {
                if(result[0] != null) resolve(true);
                else resolve(false);
            }
        });
    });
}
  
module.exports = { createUserProfile, getUserByNickname };