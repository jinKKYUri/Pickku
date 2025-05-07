// src/routes/MainRouter.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import SetProfile from "../pages/SetProfile";
import MyPage from "../pages/MyPage";
import WriteBoard from "../pages/WriteBoard";
import NotFound from "../pages/NotFound";
import Categories from "../pages/Categories";
import DefaultLayout from "../components/layouts/DefaultLayout";
import AuthLayout from "../components/layouts/AuthLayout";
import ScrollToTop from "../components/ScrollToTop";

// import ProtectedRoute from './ProtectedRoute';
function MainRouter() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* 인증이 필요한 페이지 */}
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/signUp" element={<AuthLayout><SignUp /></AuthLayout>} />

        {/* 기본 레이아웃을 사용하는 페이지 */}
        <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
        <Route path="/setProfile" element={<DefaultLayout><SetProfile /></DefaultLayout>} />
        <Route path="/mypage/:id" element={<DefaultLayout><MyPage /></DefaultLayout>} />
        <Route path="/writeboard" element={<DefaultLayout><WriteBoard /></DefaultLayout>} />
        <Route path="/categories" element={<DefaultLayout><Categories /></DefaultLayout>} />
        {/* ProtectedRoute로 보호되는 경로 */}
        {/* <Route path="/login" element={<ProtectedRoute component={Login} />} /> */}

        {/* 모든 경로가 일치하지 않을 때 */}
        <Route path="*" element={<DefaultLayout><NotFound /></DefaultLayout>} />
      </Routes>
    </>
  );
}

export default MainRouter;
