// import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { ReactComponent as Logo } from '../assets/logo.svg';
import '../styles/Header.css';

const Header = ({ type }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // 로그인 페이지로 이동
    navigate('/login');
  };

  return (
    <header className="relative z-40 flex bg-parent h-[66px] top-0 left-0 right-0">
      <div className="m-0 mx-auto flex w-[1200px] flex-row items-center p-0 px-4 justify-center ">
        <a className="h-[50px] w-[100px] cursor-pointer no-underline" aria-label="logo" href="/">
          <Logo />
        </a>
        {type === 'main' && (
          <>
          <div></div>
          <SearchBar />
          <div style={{ flexGrow: 1 }}></div>
          <div className="flex flex-row items-center">
            <button
              type="button"
              className="relative h-9 flex items-center mr-6 no-underline whitespace-nowrap bg-transparent border-none p-0 cursor-pointer"
              onClick={handleLoginClick}
            >
              <p className="css-u2plft" variant="body2" color="gray900">로그인</p>
            </button>
          </div>
          </>
        )}
        </div>
    </header>
  );
}

export default Header;
