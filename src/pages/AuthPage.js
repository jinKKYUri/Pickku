// import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
const AuthPage = ({ type }) => {
  return (
    <div className= "absolute left-0 top-0 z-1000 w-full sm:px-[16px]">
      <div className="fixed inset-0 bg-white sm:bg-[#f1f1f1]"></div>
      <Header />
      {type === 'login' && (
        <LoginForm />
      )}
      </div>
  );
}

export default AuthPage;
