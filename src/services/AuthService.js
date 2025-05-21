import axios from 'axios';

const SIGNUP_ENDPOINT = '/api/auth/signup';

export async function signUp(userData) {
    try {
        const response = await axios.post(SIGNUP_ENDPOINT, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const LOGIN_ENDPOINT = '/api/auth/login';

export async function login(credentials) {
    try {
        const response = await axios.post(LOGIN_ENDPOINT, credentials);
        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        throw error;
    }
}