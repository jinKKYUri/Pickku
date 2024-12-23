import axios from "axios";

const localurl = "http://localhost:8000";
const remoteurl = "http://wlsrb3469.iptime.org:8000";

const url = localurl;

// 로그인 요청을 처리하는 서비스 함수
async function loginUser(userId, userPw) {
  try {
    const response = await axios.post(`${url}/auth/login`, { userId, userPw });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("dwqdw");
      console.log(error.response.data.message);
      throw new Error(error.response.data.message);
    } else {
      throw new Error("서버 오류");
    }
  }
}

// 회원가입 요청을 처리하는 서비스 함수
async function signUpUser(userId, userPw, userMail, userPhone) {
  try {
    console.log(url);
    const response = await axios.post(`${url}/auth/signup`, {
      userId,
      userPw,
      userMail,
      userPhone,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("서버 오류");
    }
  }
}

//20241126 최규리 작성
//token을 검증하는 함수
async function checkToken(token) {
  try {
    const response = await axios.get(`${url}/auth/checkToken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//20241124 최진규 작성
//token 필요할듯
//사용자 시퀀스 가져오는 함수
async function getUserSeq(userId) {
  try {
    const response = await axios.post(`${url}/auth/userseq`, { userId });
    return response.data.userSeq;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("서버 오류");
    }
  }
}

//초기 프로필 저장 서비스 함수
async function setProfile(userSeq, userNick, userContent, userImg) {
  try {
    const response = await axios.post(`${url}/auth/setprofile`, {
      userSeq,
      userNick,
      userContent,
      userImg,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("서버 오류");
    }
  }
}

// 함수들을 한 번에 export
export { loginUser, signUpUser, getUserSeq, setProfile, checkToken };
//export default AuthService;
