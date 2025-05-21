import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
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
      // TODO: 실제 API 연동 시 이메일로 인증 코드 전송 로직 구현
      const response = await axios.post(
        'http://wlsrb3469.iptime.org:5000/api/auth/send-verification',
        { email }
      );
      if (response.data.success) {
        setIsCodeSent(true);
        console.log(response.data.requestId);
        setRequestId(response.data.requestId);
        alert('인증 코드가 이메일로 전송되었습니다.');
      } else {
        throw new Error(response.data.message?.error || '인증 코드 전송에 실패했습니다.');
      }
    } catch (error) {
      console.error('인증 코드 전송 실패:', error);
      setError('인증 코드 전송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // TODO: 실제 API 연동 시 인증 코드 검증 로직 구현
      const response = await axios.post('http://wlsrb3469.iptime.org:5000/api/auth/verify', {
        email,
        verificationCode,
        requestId,
        isLogin: true
      });
      if (response.data.success) {

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userInfo', JSON.stringify(response.data.userInfo));
        navigate('/');
      } else {
        throw new Error(response.data.message?.error || '인증 코드 검증에 실패했습니다.');
      }

    } catch (error) {
      console.error('인증 실패:', error);
      setError('인증에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-8">
      <div className="text-center">
        <Link to="/" className="inline-block mb-6">
          <h1 className="text-4xl font-extrabold text-foreground">Pickku</h1>
        </Link>
      </div>

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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              {isLoading ? '처리중...' : '로그인'}
            </button>

            <button
              type="button"
              onClick={() => setIsCodeSent(false)}
              className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              이메일 다시 입력
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
