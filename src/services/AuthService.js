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

//20241126 최규리 작성
//token을 검증하는 함수(reponse값이 따로 없음 확인용 message만 있고)
const checkToken = async (token) => {

  const response = await fetch('http://wlsrb3469.iptime.org:8001/auth/checkToken', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('토큰 검증 실패');
  }

  return response;
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
export { loginUser, signUpUser,getUserSeq, setProfile, checkToken };
//export default AuthService;