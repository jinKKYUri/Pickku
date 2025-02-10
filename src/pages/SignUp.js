// jk_fe/src/pages/SignUp.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../services/AuthService";
import TermsAgreement from "../components/TermsAgreement";
import "../styles/SignUp.css";
//회원가입
function SignUp() {

  const [email, setEmail] = useState("");
  const [usernick, setUserNick] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  const [isFormValid, setIsFormValid] = useState(false); // 폼 유효성 체크

  const [agreedTerms, setAgreedTerms] = useState([]);
  const [isTermsAgreed, setIsTermsAgreed] = useState(false); //약관 동의 상태

  const navigate = useNavigate();
  useEffect(() => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const isValiduserNick = /^[가-힣a-zA-Z0-9]{1,10}$/.test(usernick.trim()) && usernick.length <= 10;
    const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password);
    const isPasswordMatched = password === checkPassword;
    const isValidPhone = /^01[016789]\d{7,8}$/.test(phone.trim());


    setIsFormValid(
      isValidEmail && isValiduserNick && isValidPassword && isPasswordMatched && isValidPhone
    );
  }, [email, usernick, password, checkPassword, phone]);

  // ✅ 회원가입할 때 약관동의 같이 보내기! 
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await signUpUser(email, usernick, password, phone);
      console.log(response);
      navigate("/setProfile", { state: { email: email } });
    } catch (error) {
      setError(error.response?.data?.message || "회원가입 실패");
    }
  };
  const handleTermsChange = (newAgreedTerms) => {
    setAgreedTerms(newAgreedTerms);
  };
  //이메일로 직접 가입 or 간편 가입
  //본인인증 -> 약관동의 -> 정보입력 -> 완료
  return (
    <>
      <div className="content">
        <div className="border-box">
          <div className="signup-area">
            <h2 className="signup-title">회원가입</h2>
            <form onSubmit={handleSignUp}>
              <div className="input-area">
                <div className="input-box">
                  <label className="" htmlFor="email">
                    이메일
                    <span className="required">*</span>
                  </label>
                  <div className="input-item">
                    <input
                      type="email"
                      name="email"
                      placeholder="이메일"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <i></i>
                  </div>
                </div>
                <div className="input-box">
                  <label className="" htmlFor="usernick">
                    닉네임
                    <span className="required">*</span>
                  </label>
                  <div className="input-item">
                    <input
                      type="text"
                      name="usernick"
                      placeholder="10자"
                      value={usernick}
                      onChange={(e) => setUserNick(e.target.value)}
                    />
                    <i></i>
                  </div>
                </div>
                <div className="input-box">
                  <label className="" htmlFor="password">
                    비밀번호
                    <span className="required">*</span>
                  </label>
                  <div className="input-item">
                    <input
                      type="password"
                      name="password"
                      placeholder="영문, 숫자, 특수문자 조합 8-16자"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                  </div>
                </div>
                <div className="input-box">
                  <label className="" htmlFor="confirm-password">
                    비밀번호 확인
                    <span className="required">*</span>
                  </label>
                  <div className="input-item">
                    <input
                      type="password"
                      name="password"
                      placeholder="비밀번호 확인"
                      value={checkPassword}
                      onChange={(e) => setCheckPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                  </div>
                </div>
                <div className="input-box">
                  <label className="" htmlFor="phone">
                    핸드폰
                    <span className="required">*</span>
                  </label>
                  <div className="input-item">
                    <input
                      type="text"
                      name="phone"
                      placeholder="'-'제외하고 입력해주세요"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
              {/* 약관 동의 컴포넌트 */}
              <TermsAgreement
                onTermsChange={handleTermsChange}
                onAgree={(checked) => setIsTermsAgreed(checked)}
              />
              <button
                className={`signup-button ${!(isFormValid && isTermsAgreed) ? "invalid" : "valid"}`}
                type="submit"
                disabled={!(isFormValid && isTermsAgreed)}
              >
                회원가입
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
