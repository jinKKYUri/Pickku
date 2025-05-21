// jk_fe/src/pages/SignUp.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

//회원가입
function SignUp() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [requestId, setRequestId] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendVerificationCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('Sending verification request for email:', email);
      const response = await axios.post(
        'http://wlsrb3469.iptime.org:5000/api/auth/request-verification',
        { email }
      );

      console.log('Verification response:', response.data);

      if (response.data.success) {
        setIsCodeSent(true);
        setRequestId(response.data.requestId);
        alert('인증 코드가 이메일로 전송되었습니다.');
      } else {
        throw new Error(response.data.message?.error || '인증 코드 전송에 실패했습니다.');
      }
    } catch (error) {
      console.error('인증 코드 전송 실패:', error);
      setError(error.response?.data?.message?.error || error.message || '인증 코드 전송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://wlsrb3469.iptime.org:5000/api/auth/verify-email', {
        email,
        verificationCode,
        requestId: requestId,
        isLogin: false
      });

      if (response.data.success) {
        // 회원가입 완료 처리
        const userInfo = {
          id: response.data.userId,
          email: response.data.email,
          nickname: response.data.nickname,
          role: response.data.role,
        };

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        // 회원가입 완료 페이지로 이동
        navigate('/signup/complete');
      } else {
        throw new Error(response.data.message?.error || '인증에 실패했습니다.');
      }
    } catch (error) {
      console.error('인증 실패:', error);
      setError(error.response?.data?.message?.error || error.message || '인증에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = async (provider) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.get(`/auth/${provider}`);

      if (response.data.success) {
        const userInfo = {
          id: response.data.userId,
          email: response.data.email,
          nickname: response.data.nickname,
          role: response.data.role,
          provider: response.data.provider,
        };

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        // 회원가입 완료 페이지로 이동
        navigate('/signup/complete');
      } else {
        throw new Error(response.data.message || '소셜 로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('소셜 회원가입 실패:', error);
      setError(error.response?.data?.message || '소셜 회원가입에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderEmailForm = () => (
    <div className="space-y-6">
      {!isCodeSent ? (
        <form onSubmit={handleSendVerificationCode} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="이메일을 입력하세요"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            {isLoading ? '처리중...' : '인증 코드 받기'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="space-y-6">
          <div>
            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
              인증 코드
            </label>
            <input
              id="verificationCode"
              name="verificationCode"
              type="text"
              required
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="인증 코드를 입력하세요"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              {isLoading ? '처리중...' : '인증 완료'}
            </button>

            <button
              type="button"
              onClick={() => setIsCodeSent(false)}
              className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              이메일 다시 입력
            </button>
          </div>
        </form>
      )}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">간편 회원가입</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleSocialSignup('naver')}
          className="flex items-center justify-center gap-2 p-3 rounded-lg text-white"
          style={{ backgroundColor: '#03C75A' }}
        >
          <img src="/naver-icon.png" alt="Naver" className="w-5 h-5" />
          <span className="font-medium">네이버</span>
        </button>

        <button
          onClick={() => handleSocialSignup('google')}
          className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
        >
          <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
          <span className="font-medium text-gray-700">Google</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto space-y-8 p-6">
      <div className="text-center">
        <Link to="/" className="inline-block mb-6">
          <h1 className="text-4xl font-extrabold text-foreground">Pickku</h1>
        </Link>
        <h2 className="text-2xl font-bold">회원가입</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {renderEmailForm()}
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          이미 회원이신가요?{' '}
          <Link to="/login" className="font-medium text-pink-600 hover:text-pink-500">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
