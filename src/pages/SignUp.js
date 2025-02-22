// jk_fe/src/pages/SignUp.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser, sendVerificationCode, verifyEmailCode } from "../services/AuthService";
import TermsAgreement from "../components/TermsAgreement";
import "../styles/SignUp.css";
//회원가입
function SignUp() {

  const [email, setEmail] = useState("");
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [isFormValid, setIsFormValid] = useState(false); // 폼 유효성 체크
  const [termsAgreement, setAgreedTerms] = useState([]);
  const [isTermsAgreed, setIsTermsAgreed] = useState(false); //약관 동의 상태

  const navigate = useNavigate();


  //format 형식 조건
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isValidNick = /^[가-힣a-zA-Z0-9]{1,10}$/.test(nick.trim()) && nick.length <= 10;
  const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password);
  const isPasswordMatched = password === checkPassword;
  const isValidPhone = /^01[016789]\d{7,8}$/.test(phone.trim());

  //인증 요청 상태
  const [isEmailVerificationRequested, setIsEmailVerificationRequested] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  //최종 인증 상태
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 상태
  const [isPhoneVerified, setIsPhoneVerified] = useState(false); // 핸드폰 인증 상태

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsFormValid(
      isValidEmail && isValidNick && isValidPassword && isPasswordMatched && isValidPhone
    );
  }, [email, nick, password, checkPassword, phone]);


  // ✅ 이메일 인증 번호 발송(+ 중복확인 )
  const sendEmailCode = async (e) => {
    e.preventDefault();
    try {
      const response = await sendVerificationCode(email);
      setErrorMessage(""); 
      setIsEmailVerificationRequested(true);
    } catch (error) {
      setIsEmailVerificationRequested(false);
      console.log("Error:", error.message);
      setErrorMessage(error.message); 
    }
  };

  // ✅ 이메일 인증 확인
  const verifyEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyEmailCode(email, verificationCode);
      if (response.isVerified) {
        setErrorMessage("인증 확인");
        setIsEmailVerified(true);
      }
    } catch (error) {
      setIsEmailVerified(false);
      setErrorMessage(error.message);
    }
  };


  // ✅ 회원가입
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await signUpUser(email, nick, password, phone, termsAgreement, "LOCAL");
      console.log(response);
      navigate("/setProfile", { state: { email: email } });
    } catch (error) {
    }
  };

  const handleTermsChange = (newAgreedTerms) => {
    setAgreedTerms(newAgreedTerms);
  };

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
                    <div className={`verification-check ${(isEmailVerified) ? "verified" : ""}`}>&#10004;</div>
                    <button
                      className={`check-btn ${(!isValidEmail) ? "invalid" : "valid"}`}
                      disabled={!isValidEmail || isEmailVerified}
                      onClick={sendEmailCode}>
                      이메일 인증 </button>
                  </div>

                  {isEmailVerificationRequested && !isEmailVerified && (
                    <div className="input-item verification-code">
                      <input
                        type="text"
                        name="verificationCode"
                        placeholder="인증 번호 입력"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                      />
                      <button
                        className="check-btn valid"
                        onClick={verifyEmail}>
                        인증 번호 확인</button>
                    </div>
                  )}
                  {errorMessage && !isEmailVerified && <div className="error-message">{errorMessage}</div>}
                </div>
                <div className="input-box">
                  <label className="" htmlFor="nick">
                    닉네임
                    <span className="required">*</span>
                  </label>
                  <div className="input-item">
                    <input
                      type="text"
                      name="nick"
                      placeholder="10자"
                      value={nick}
                      onChange={(e) => setNick(e.target.value)}
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
                    <button
                      className={`check-btn ${(!isValidPhone) ? "invalid" : "valid"}`}
                      disabled={!isValidPhone}>
                      핸드폰 인증 </button>
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
