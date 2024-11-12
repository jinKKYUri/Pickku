import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Login() {
    const [userId, setUserId] = useState(''); // state 초기화
    const [password, setPassword] = useState('');
    const [token,setToken] =useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://wlsrb3469.iptime.org:8002/test/testlogin', {
                userId,
                password,
            });
            setToken(response.data.token)
            localStorage.setItem('token', response.data.token); // 토큰 저장
            // navigate('/home'); // 로그인 성공 시 대시보드로 이동
        } catch (error) {
            setError(error.response?.data?.message || '로그인 실패');
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit} class="px-4 py-3">
                <div class="mb-3">
                    <label style={{ color: "#000" }} for="exampleDropdownFormEmail1" class="form-label">Email address</label>
                    <input type="userId" class="form-control" id="exampleDropdownFormEmail1"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required placeholder="ID" />
                </div>
                <div class="mb-3">
                    <label style={{ color: "#000" }} for="exampleDropdownFormPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleDropdownFormPassword1"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        required placeholder="Password" />
                </div>
                <div class="mb-3">
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="dropdownCheck" />
                        <label style={{ color: "#000" }} class="form-check-label" for="dropdownCheck">
                            Remember me
                        </label>
                    </div>
                </div>
                {token && <p style={{ color: 'black' }}>{token}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" class="btn btn-primary">Sign in</button>
            </form>
            <div class="dropdown-divider"></div>
            <a style={{ color: "#000" }} class="dropdown-item" href="#">New around here? Sign up</a>
            <a style={{ color: "#000" }} class="dropdown-item" href="#">Forgot password?</a>
        </>
    );
}

export default Login;