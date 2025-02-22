import axios from "axios";

// const localurl = "http://localhost:8000";
const remoteurl = "http://wlsrb3469.iptime.org:8000";

const url = remoteurl;

//회원가입 페이지에서 약관동의 내용 불러오는 서비스 함수
async function getTerms() {
    try {
        const response = await axios.get(`${url}/terms`);
        return response;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            throw new Error("서버 오류");
        }
    }
}

export { getTerms };