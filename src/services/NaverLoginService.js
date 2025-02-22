import axios from "axios";
const remoteurl = "http://wlsrb3469.iptime.org:8000";

const url = remoteurl;


function NaverLoginPopup(onLoginSuccess, onLoginFailure) {
    const clientId = process.env.REACT_APP_NAVER_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_NAVER_REDIRECT_URI;
    const state = Math.random().toString(36).substring(2);
    localStorage.setItem("naver_state", state);
    // 네이버 로그인 URL
    const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
    const popup = window.open(url, "NaverLoginPopup", "width=600,height=600");

    const checkPopupClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkPopupClosed);
            window.location.href = "/";
            
        }
      }, 500); 
}
async function getNaverAccessToken(authCode, state) {
    try {
        const response = await axios.post(`${url}/auth/naver/login`, { code: authCode, state });
        return response;
    } catch (error) {
        console.error("네이버 토큰을 받을 수 없습니다.");
        throw error;
    }
}

export {
    NaverLoginPopup,
    getNaverAccessToken,
};
