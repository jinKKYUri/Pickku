import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkToken } from '../services/AuthService';
import SearchBar from '../components/SearchBar';
import { ReactComponent as Logo } from '../assets/logo.svg';
import '../styles/Header.css';

const Header = ({ type }) => {
  const [user, setUser] = useState(null); // 사용자 정보
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userInfo = await checkToken(token);
          setUser(userInfo.nick);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("토큰 검증 실패:", error);
        }
      }
    };

    getUserInfo();
    console.log("누름");
  }, []);

  const handleLoginClick = () => {
    // 로그인 페이지로 이동
    navigate('/login');
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('token'); // 토큰 저장
    navigate('/');
    console.log("로그아웃 실행!");
  };  

  return (
    <header className="relative z-40 flex bg-parent h-[66px] top-0 left-0 right-0">
      <div className="m-0 mx-auto flex w-[1200px] flex-row items-center p-0 px-4 justify-center ">
        <a className="h-[50px] w-[100px] cursor-pointer no-underline" aria-label="logo" href="/">
          <Logo />
        </a>
        {type === 'main' && (
          <>
            <div style={{ flexGrow: 1 }}></div>
            <SearchBar />
            <div className="inline-flex items-center gap-5">
              {isLoggedIn ? (
                <>
                  <p className='inline-block w-auto'>{user}님</p>
                  <button
                    type="button"
                    className="relative h-9 flex items-center rounded-lg no-underline whitespace-nowrap px-4 py-0 cursor-pointer bg-black"
                    onClick={handleLogoutClick}
                  >
                    <p className="text-white" variant="body2" color="gray900">로그아웃</p>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="relative h-9 flex items-center mr-6 no-underline whitespace-nowrap bg-transparent border-none p-0 cursor-pointer"
                  onClick={handleLoginClick}
                >
                  <p className="css-u2plft" variant="body2" color="gray900">로그인</p>
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
