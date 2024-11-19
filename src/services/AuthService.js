import axios from 'axios';

// 로그인 요청을 처리하는 서비스 함수
const loginUser = async (username, password) => {
  try {
    const response = await axios.post('/auth/login', { username, password });
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
const signupUser = async (username, password, email, ) => {
  try {
    const response = await axios.post('/auth/signup', { username, password, email });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('서버 오류');
    }
  }
};

// 함수들을 한 번에 export
export { loginUser, signupUser };
//export default AuthService;