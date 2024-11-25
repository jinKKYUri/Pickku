import axios from 'axios';

// 로그인 요청을 처리하는 서비스 함수
const loginUser = async (userId, userPw) => {
  try {
    const response = await axios.post('http://wlsrb3469.iptime.org:8001/auth/login', { userId, userPw });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('서버 오류');
    }
  }
};

// 회원가입 요청을 처리하는 서비스 함수
const signUpUser = async (userId, userPw, userMail, userPhone) => {
  try {
    const response = await axios.post('http://wlsrb3469.iptime.org:8001/auth/signup', { userId, userPw, userMail, userPhone });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('서버 오류');
    }
  }
};


//20241124 최진규 작성
//token 필요할듯
//사용자 시퀀스 가져오는 함수 
const getUserSeq = async (userId) => {
  try {
    const response = await axios.post('http://wlsrb3469.iptime.org:8001/auth/userseq', { userId });
    return response.data.userSeq;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('서버 오류');
    }
  }
}



//초기 프로필 저장 서비스 함수
const setProfile = async (userSeq,userNick, userContent, userImg) => {
  try {
    const response = await axios.post('http://wlsrb3469.iptime.org:8001/auth/setprofile', { userSeq,userNick, userContent, userImg });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('서버 오류');
    }
  }
}

// 함수들을 한 번에 export
export { loginUser, signUpUser,getUserSeq, setProfile };
//export default AuthService;