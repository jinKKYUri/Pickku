import axios from 'axios';

// 로그인 요청을 처리하는 서비스 함수
const loginUser = async (username, password) => {
  try {
    const response = await axios.post('http://wlsrb3469.iptime.org:8002/auth/login', { username, password });
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
const signUpUser = async (userId, password, email, phone) => {
  try {
    const response = await axios.post('http://wlsrb3469.iptime.org:8002/auth/signup', { userId, password, email ,phone});
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('서버 오류');
    }
  }
};

const setProfile = async (nickname,content,userImg) =>{
  try{
    const response = await axios.post('http://wlsrb3469.iptime.org:8002/auth/signup', { nickname,content,userImg});
    return response.data;
  }catch(error){
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('서버 오류');
    }
  }
}

// 함수들을 한 번에 export
export { loginUser, signUpUser ,setProfile};
//export default AuthService;