// jk_fe/src/pages/SignUp.js

import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { ReactComponent as Logo } from "../assets/logo.svg";
import { NaverLoginPopup } from "../services/NaverLoginService";

//회원가입
function SignUpTypePage() {
  const handleNaverLogin = async (e) => {
    e.preventDefault();
    NaverLoginPopup();
  };

  return (
    <>
      <div style={{ marginTop: '5%' }} className="md:pt-[30px] xl:gap-[50px] mx-auto max-w-screen-xl w-full">
          <div className="logo" > {/* 로고 */}
            <a aria-label="logo" href="/"> <Logo /> </a>
          </div>
        <div className="relative left-1/2 max-w-3xl w-full flex flex-col overflow-hidden md:mb-[60px] md:mt-[10px] md:flex-row md:rounded-3 -translate-x-1/2 border-0 sm:border-2 sm:rounded-lg sm:border-gray-250">
          <div style={{ border: "0.5px solid", borderRadius: "10px", margin: "5%" }} className="relative z-20 grow  rounded-t-[12px] bg-white px-[16px] py-[50px] md:rounded-0 md:px-[40px]">
            <Link to="/signup"><Button variant="primary">이메일 가입</Button></Link><br />
            <Button variant="success" onClick={handleNaverLogin}>네이버 간편 가입</Button><br />
            <Button variant="danger">구글 간편 가입</Button><br />
            <Button variant="warning">카카오톡 간편 가입</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpTypePage;
