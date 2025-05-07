// jk_fe/src/pages/SignUp.js

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../services/AuthService";

//회원가입
function SignUp() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    emailVerificationCode: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsVerificationSent(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVerificationSend = () => {
    // 인증번호 발송 로직
    setIsVerificationSent(true);
    setTimer(10); // 10초
  };

  const handleVerificationCheck = () => {
    // 인증번호 확인 로직 구현 예정
    setIsVerified(true);
    // 성공 시 타이머 중지
    setTimer(0);
    setIsVerificationSent(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      setError("이메일 인증을 완료해주세요.");
      return;
    }
    if (formData.password !== formData.passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      setIsLoading(true);
      // 회원가입 API 호출
      // await signUpUser(formData);
      navigate('/signup-complete');
    } catch (err) {
      setError(err.message || "회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8 p-6">
      {/* 헤더 */}
      <div className="text-center">
        <Link to="/" className="inline-block mb-6">
          <h1 className="text-4xl font-extrabold text-foreground">Pickku</h1>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        {step === 1 && (
          <div className="space-y-4">
            <button
              onClick={() => setStep(2)}
              className="w-full flex items-center justify-center gap-3 p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">이메일로 가입하기</span>
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">간편 로그인</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                style={{ backgroundColor: '#03C75A' }}
              >
                <img src="/naver-icon.png" alt="Naver" className="w-5 h-5" />
                <span className="text-sm font-semibold text-white">네이버</span>
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                style={{ backgroundColor: '#FEE500' }}
              >
                <img src="/kakao-icon.png" alt="Kakao" className="w-5 h-5" />
                <span className="text-sm font-semibold text-[#000000]">카카오</span>
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors bg-white"
              >
                <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
                <span className="text-sm font-semibold text-gray-700">Google</span>
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                style={{ backgroundColor: '#1DA1F2' }}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
                <span className="text-sm font-semibold text-white">Twitter</span>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                이메일
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isVerified}
                />
                {!isVerified && (
                  <button
                    type="button"
                    className={`absolute right-0 top-0 h-full px-3 py-2 text-sm font-semibold
                      ${isVerificationSent
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-pink-600 hover:text-pink-700'}`}
                    onClick={handleVerificationSend}
                    disabled={isVerificationSent}
                  >
                    {isVerificationSent ? '재발송 대기중' : '인증번호 발송'}
                  </button>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="emailVerificationCode" className="block text-sm font-medium text-gray-700">
                인증번호
                <span className="text-red-500 ml-1">*</span>
                {timer > 0 && (
                  <span className="text-pink-500 ml-2">
                    {formatTime(timer)}
                  </span>
                )}
              </label>
              <div className="mt-1 relative">
                <input
                  id="emailVerificationCode"
                  name="emailVerificationCode"
                  type="text"
                  required
                  placeholder="인증번호 6자리를 입력해주세요"
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm 
                    ${isVerified
                      ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
                      : 'border-gray-300 focus:ring-pink-500 focus:border-pink-500'
                    } pr-24`}
                  value={formData.emailVerificationCode}
                  onChange={handleInputChange}
                  disabled={isVerified}
                />
                <button
                  type="button"
                  onClick={handleVerificationCheck}
                  disabled={!isVerificationSent || isVerified || timer === 0}
                  className={`absolute right-0 top-0 h-full px-4 text-sm font-semibold rounded-r-md
                    ${isVerified
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : isVerificationSent && timer > 0
                        ? 'bg-pink-500 text-white hover:bg-pink-600'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                >
                  {isVerified ? '인증완료' : '인증하기'}
                </button>
              </div>
              {timer === 0 && isVerificationSent && !isVerified && (
                <p className="mt-1 text-sm text-red-500">
                  인증 시간이 만료되었습니다. 인증번호를 다시 발송해주세요.
                </p>
              )}
              {/* {isVerified && (
                <p className="mt-1 text-sm text-green-500">
                  이메일 인증이 완료되었습니다.
                </p>
              )} */}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">
                비밀번호 확인
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                value={formData.passwordConfirm}
                onChange={handleInputChange}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !isVerified}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white
                ${isLoading || !isVerified
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
                }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  회원가입 중...
                </>
              ) : (
                '회원가입'
              )}
            </button>
          </form>
        )}

        {error && (
          <div className="mt-4 rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 text-center text-sm text-gray-500">
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="font-semibold text-pink-500 hover:text-pink-600">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
