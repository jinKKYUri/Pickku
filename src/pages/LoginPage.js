import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/AuthService";

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ReactComponent as Logo } from "../assets/logo.svg";




function LoginPage() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const isFormValid = mail.trim() !== "" && password.trim() !== "";

  const [token, setToken] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  });

  const handleClickLogo = async (e) => {
    navigate("/");
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(mail, password); // authService 호출
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
    <>
      <div style={{marginTop:'5%'}} className="md:pt-[30px] xl:gap-[50px] mx-auto max-w-screen-xl w-full">
        <div className="flex justify-center">
          <button className="mb-[38px] text-xl font-semibold" onClick={handleClickLogo}>
            <Logo />
          </button>
        </div>
        <div className="relative left-1/2 max-w-3xl w-full flex flex-col overflow-hidden md:mb-[60px] md:mt-[10px] md:flex-row md:rounded-3 -translate-x-1/2 border-0 sm:border-2 sm:rounded-lg sm:border-gray-250">
          <div style={{ border: "0.5px solid", borderRadius: "10px" ,margin:"5%"}} className="relative z-20 grow  rounded-t-[12px] bg-white px-[16px] py-[50px] md:rounded-0 md:px-[40px]">
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel
                  controlId="floatingInput"
                  label="이메일"
                  className="mb-3"
                >
                  <Form.Control type="email" placeholder="name@example.com" value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    style={{ outline: "none", boxShadow: "none" }} />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <FloatingLabel controlId="floatingPassword" label="비밀번호">
                  <Form.Control type="password" name="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ outline: "none", boxShadow: "none" }} />
                </FloatingLabel>
              </Form.Group>

              {isFormValid ?
                <Button className="w-[100%]" variant="dark" type="submit">
                  로그인
                </Button>
                :
                <Button className="w-[100%]" variant="secondary" disabled>
                  로그인
                </Button>
              }
              {error && <p style={{ color: "red" }}>{error}</p>}
            </Form>
            <div className="mt-[38px]">
              <h3 className="relative mb-[20px] text-center text-sm text-gray-500 before:absolute before:top-1/2 before:block before:w-full before:border-t before:content-empty before:-z-1">
                <span className="relative bg-white px-[12px] z-10">
                  간편 로그인하기
                </span>
              </h3>
              <div className="flex justify-center gap-[25px]">
                <button className="h-[50px] w-[50px] flex both-center gap-2 border rounded-full text-sm font-semibold transition hover:border-gray-300">
                  <img
                    src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA4MTBfMjkg%2FMDAxNTAyMzQ1NjgxMTcx.HN5OduMJB4wLP2Ryov53lcBW-UhIkXLXZdd_SRReFAgg.mL_h394FDyN7gsATSeFOYSoDYWMPnuLPSfcLkquAIdMg.PNG.baroniter%2Fnaver_pay_img_04.png&type=a340"
                    alt="Naver"
                    className="h-[50px] w-[50px] rounded-full"
                  />
                  <span className="sr-only">네이버 계정으로 로그인하기</span>
                </button>
                <button className="h-[50px] w-[50px] flex both-center gap-2 border rounded-full text-sm font-semibold transition hover:border-gray-300">
                  <img
                    src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20150902_266%2Fairishj01_1441151685011H1zoF_JPEG%2F11813434_10153577767937838_3231184993169792009_n.jpg&type=a340"
                    alt="Naver"
                    className="h-[50px] w-[50px] rounded-full"
                  />
                  <span className="sr-only">구글 계정으로 로그인하기</span>
                </button>
              </div>
            </div>
            <div className="mx-auto mt-[20px] block text-center text-sm text-gray-700 space-x-[10px]">
              <span>계정이 없으신가요?</span>
              {/* <Link to="/SignUp">
                <span className="font-semibold underline">회원가입 하기</span>
              </Link> */}
              <Link to="/signuptype">
                <span className="font-semibold underline">회원가입 하기</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
