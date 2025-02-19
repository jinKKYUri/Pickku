// src/routes/MainRouter.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import SetProfile from "../pages/SetProfile";
import MyInfoPage from "../pages/MyInfoPage";
import WriteBoard from "../pages/WriteBoard";
import SignUpTypePage from "../pages/SignUpTypePage";

// import ProtectedRoute from './ProtectedRoute';
function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signuptype" element={<SignUpTypePage />} />
      <Route path="/setprofile" element={<SetProfile />} />
      <Route path="/mypage/:id" element={<MyInfoPage />} />
      <Route path="/writeboard" element={<WriteBoard />} />
      {/* ProtectedRoute로 보호되는 경로 */}
      {/* <Route path="/login" element={<ProtectedRoute component={Login} />} /> */}

      {/* 모든 경로가 일치하지 않을 때 */}
      <Route path="*" element={<h1>404 페이지를 찾을 수 없습니다</h1>} />
    </Routes>
  );
}

export default MainRouter;
