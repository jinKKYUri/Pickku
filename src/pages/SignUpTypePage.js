// jk_fe/src/pages/SignUp.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { localSignUp } from "../services/AuthService";

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ReactComponent as Logo } from "../assets/logo.svg";

//회원가입
function SignUpTypePage() {
  const [userMail, setUserMail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [phone, setUserPhone] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const isFormValid = userMail.trim() !== "" && password.trim() !== "";

  const handleClickLogo = async (e) => {
    navigate("/");
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (password === checkPassword) {
        const response = await localSignUp(userMail, password,phone); // signupUser 호출
        console.log(response);
        navigate("/setProfile", { state: { userMail: userMail } });
      } else {
        alert("패스워드가 일치하지 않습니다.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "회원가입 실패");
    }
  };
  return (
    <>
      <div style={{marginTop:'5%'}} className="md:pt-[30px] xl:gap-[50px] mx-auto max-w-screen-xl w-full">
        <div className="flex justify-center">
          <button className="mb-[38px] text-xl font-semibold" onClick={handleClickLogo}>
            <Logo />
          </button>
        </div>
        <div className="relative left-1/2 max-w-3xl w-full flex flex-col overflow-hidden md:mb-[60px] md:mt-[10px] md:flex-row md:rounded-3 -translate-x-1/2 border-0 sm:border-2 sm:rounded-lg sm:border-gray-250">
          <div style={{ border: "0.5px solid", borderRadius: "10px" ,margin:"5%"}} className="relative z-20 grow  rounded-t-[12px] bg-white px-[16px] py-[50px] md:rounded-0 md:px-[40px]"> 
            <Link to="/signup"><Button variant="primary">이메일 가입</Button></Link><br/>
            <Button variant="danger">구글 간편 가입</Button><br/>
            <Button variant="warning">카카오톡 간편 가입</Button><br/>
            <Button variant="success">네이버 간편 가입</Button>

          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpTypePage;
