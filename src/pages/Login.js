import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/AuthService";

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ReactComponent as Logo } from "../assets/logo.svg";
import "../styles/Login.css";
import Header from "../components/Header";

function Login() {
  const [userMail, setUserMail] = useState("");
  const [password, setPassword] = useState("");
  const isFormValid = userMail.trim() !== "" && password.trim() !== "";

  const [token, setToken] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(userMail, password); // authService 호출
      if (!response.token) {
        navigate("/setProfile", { state: { userMail: response.userId, userSeq: response.userSeq } });
      } else {
        setToken(response.token);
        localStorage.setItem("token", response.token); // 토큰 저장
        console.log("로그인 성공")
        navigate("/"); // 로그인 성공 시 홈으로 이동
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "로그인 실패");
    }
  };

  return (
    <div>
      <div className="login">
        <div className="content">
          <div className="border-box">
            <Form className="login-area" onSubmit={handleLogin}>

              <div className="logo-title">
                <Logo />
              </div>
              <Form.Group className="input-box" controlId="formBasicEmail">
                <FloatingLabel controlId="floatingInput" label="이메일" className="input-title" />
                <div className="input-item" >
                  <Form.Control type="email" placeholder="name@example.com" value={userMail}
                    onChange={(e) => setUserMail(e.target.value)} />

                </div>
              </Form.Group>

              <Form.Group className="input-box" controlId="formBasicPassword">
                <FloatingLabel controlId="floatingPassword" label="비밀번호" className="input-title" />
                <div className="input-item" >
                  <Form.Control type="password" name="password" value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
              </Form.Group>
              <div className="login-btn-box">
                <Button className={`login-button ${isFormValid ? "valid" : "invalid"}`} type="submit" disabled={!isFormValid}>
                  로그인
                </Button>

              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}

              <ul className="auth-links">
                <li><a className="link" href="#">이메일 찾기</a></li>
                <li><a className="link" href="#">비밀번호 찾기</a></li>
                <li><a className="link" href="/SignUp">회원가입</a></li>
              </ul>
              <div className="social-login">
                <button className="btn_login_naver">
                  <img
                    src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA4MTBfMjkg%2FMDAxNTAyMzQ1NjgxMTcx.HN5OduMJB4wLP2Ryov53lcBW-UhIkXLXZdd_SRReFAgg.mL_h394FDyN7gsATSeFOYSoDYWMPnuLPSfcLkquAIdMg.PNG.baroniter%2Fnaver_pay_img_04.png&type=a340"
                    alt="Naver"
                    className="logo-social"
                  />
                  <span>네이버로 로그인</span>
                </button>
                <button className="btn_login_google">
                  <img
                    src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20150902_266%2Fairishj01_1441151685011H1zoF_JPEG%2F11813434_10153577767937838_3231184993169792009_n.jpg&type=a340"
                    alt="Naver"
                    className="logo-social"
                  />
                  <span>Google로 로그인</span>
                </button>
              </div>
            </Form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
