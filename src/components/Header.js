import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import SearchBar from "../components/SearchBar";
import { ReactComponent as Logo } from "../assets/logo.svg";
import "../styles/Header.css";

function Header({ type, user, isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleInputClick = () => {
    setIsOpen(!isOpen); // 버튼 클릭 시 입력 필드 토글
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleWriteClick = () => {
    navigate("/writeboard");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  const handleMyPageClick = () => {
    navigate(`/mypage/${user.id}`);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-main">
          <div className="logo" > {/* 로고 */}
            <a aria-label="logo" href="/"> <Logo /> </a>
          </div>
          <div className="empty-space" />
          <div className="right">
            <div className="search"> {/* 검색바 */}
              <Button variant="outline-light" className={`search-icon ${isOpen ? 'hidden' : ''}`} onClick={handleInputClick}>
                <svg aria-hidden="true" fill="currentColor" focusable="false" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" width="24" className="css-7kp13n">
                  <path clipRule="evenodd" d="M14.9401 16.2929C13.5799 17.3622 11.8644 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 11.833 17.3835 13.522 16.3466 14.871L20.7071 19.2315C21.0976 19.622 21.0976 20.2552 20.7071 20.6457C20.3166 21.0362 19.6834 21.0362 19.2929 20.6457L14.9401 16.2929ZM16 10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10Z" fillRule="evenodd" xmlns="http://www.w3.org/2000/svg"></path>
                </svg>
              </Button>
              {isOpen && <SearchBar isOpen={isOpen} setIsOpen={setIsOpen} />}
            </div>
            <div className="auth-section"> {/* 로그인 / 로그아웃 */}
              {isLoggedIn ? (
                <>
                  <span className="nickname">{user.nick}님</span>
                  <button onClick={handleWriteClick} className="write-btn">글 작성</button>
                  <button onClick={handleLogoutClick} className="logout-btn">로그아웃</button>
                </>
              ) : (
                <button onClick={handleLoginClick} className="login-btn">로그인</button>

              )}
            </div>
          </div>
        </div>
      </div>

      <Navbar />
    </header>
  );
}

export default Header;


{/* {type === "main" && (
          <>
            <div className="spacer"></div>
            <div className="button-group">
              {isLoggedIn ? (
                <>
                  
          
          <button className="mypage-button" onClick={handleMyPageClick}>
          {user.nick}님
        </button>
        <button className="action-button" onClick={handleWriteClick}>
          글 작성
        </button>
                </>
              ) : (
              )}
            </div>
          </>
        )} */}