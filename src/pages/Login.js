import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 테스트 계정 정보
  const TEST_ACCOUNTS = {
    user: {
      userId: 'user123',
      password: 'test123!',
      token: 'test_user_token',
      userInfo: {
        id: 1,
        userId: 'user123',
        nickname: '일반회원',
        email: 'user@pickku.com',
        role: 'USER',
        isPhoneVerified: false
      }
    },
    expert: {
      userId: 'expert123',
      password: 'test123!',
      token: 'test_expert_token',
      userInfo: {
        id: 2,
        userId: 'expert123',
        nickname: '전문가',
        email: 'expert@pickku.com',
        role: 'EXPERT',
        isPhoneVerified: true,
        expertInfo: {
          career: '경력 5년',
          portfolio: 'https://portfolio.pickku.com/expert123',
          categories: ['일러스트', '캐릭터 디자인']
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 테스트 계정 검증
      const userAccount = TEST_ACCOUNTS.user;
      const expertAccount = TEST_ACCOUNTS.expert;

      if (userId === userAccount.userId && password === userAccount.password) {
        // 일반 사용자 로그인
        localStorage.setItem('token', userAccount.token);
        localStorage.setItem('userInfo', JSON.stringify(userAccount.userInfo));
        navigate('/');
      } else if (userId === expertAccount.userId && password === expertAccount.password) {
        // 전문가 로그인
        localStorage.setItem('token', expertAccount.token);
        localStorage.setItem('userInfo', JSON.stringify(expertAccount.userInfo));
        navigate('/');
      } else {
        throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestAccount = (type) => {
    const account = TEST_ACCOUNTS[type];
    setUserId(account.userId);
    setPassword(account.password);
  };

  return (
    <div className="w-full space-y-8">
      {/* 헤더 */}
      <div className="text-center">
        <Link to="/" className="inline-block mb-6">
          <h1 className="text-4xl font-extrabold text-foreground">Pickku</h1>
        </Link>
      </div>

      {/* 테스트 계정 안내 */}
      <div className="bg-blue-50 p-6 rounded-xl space-y-4">
        <h3 className="text-blue-800 font-semibold">테스트 계정</h3>

        {/* 일반 사용자 계정 */}
        <div className="bg-white p-4 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">일반 회원</h4>
              <p className="text-sm text-gray-600">
                ID: {TEST_ACCOUNTS.user.userId}<br />
                PW: {TEST_ACCOUNTS.user.password}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleTestAccount('user')}
              className="px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 font-semibold rounded-lg transition-colors"
            >
              자동 입력
            </button>
          </div>
        </div>

        {/* 전문가 계정 */}
        <div className="bg-white p-4 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">전문가 회원</h4>
              <p className="text-sm text-gray-600">
                ID: {TEST_ACCOUNTS.expert.userId}<br />
                PW: {TEST_ACCOUNTS.expert.password}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleTestAccount('expert')}
              className="px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 font-semibold rounded-lg transition-colors"
            >
              자동 입력
            </button>
          </div>
        </div>
      </div>

      {/* 로그인 폼 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
            아이디
          </label>
          <input
            id="userId"
            name="userId"
            type="text"
            required
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="아이디를 입력하세요"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              로그인 상태 유지
            </label>
          </div>

          <div className="text-sm">
            <Link to="/forgot-password" className="font-medium text-pink-600 hover:text-pink-500">
              비밀번호 찾기
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:bg-pink-300 disabled:cursor-not-allowed"
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          아직 회원이 아니신가요?{' '}
          <Link to="/signup" className="font-medium text-pink-600 hover:text-pink-500">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
