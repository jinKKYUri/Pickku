// src/routes/MainRouter.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import SignUpComplete from "../pages/SignUpComplete";
import ProfileEdit from "../pages/user/ProfileEdit";
import MyPage from "../pages/user/MyPage";
import NotFound from "../pages/NotFound";
import Categories from "../pages/Categories";
import DefaultLayout from "../components/layouts/DefaultLayout";
import AuthLayout from "../components/layouts/AuthLayout";
import ScrollToTop from "../components/ScrollToTop";
import PortfolioList from "../pages/portfolio/PortfolioList";
import PortfolioDetail from "../pages/portfolio/Detail";
import PortfolioWrite from "../pages/portfolio/Write";
import ExpertRegister from '../pages/ExpertRegister';

// import ProtectedRoute from './ProtectedRoute';
function MainRouter() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* 인증이 필요한 페이지 */}
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/signup" element={<AuthLayout><SignUp /></AuthLayout>} />
        <Route path="/signup/complete" element={<AuthLayout><SignUpComplete /></AuthLayout>} />
        <Route path="/expert/register" element={<AuthLayout><ExpertRegister /></AuthLayout>} />
        {/* 기본 레이아웃을 사용하는 페이지 */}
        <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
        <Route path="/profileEdit" element={<DefaultLayout><ProfileEdit /></DefaultLayout>} />
        <Route path="/mypage" element={<DefaultLayout><MyPage /></DefaultLayout>} />
        <Route path="/categories" element={<DefaultLayout><Categories /></DefaultLayout>} />
        {/* <Route path="/portfolio" element={<DefaultLayout><PortfolioList /></DefaultLayout>} /> */}
        <Route path="/portfolio/category/:category" element={<DefaultLayout><PortfolioList /></DefaultLayout>} />
        <Route path="/portfolio/detail/:id" element={<DefaultLayout><PortfolioDetail /></DefaultLayout>} />
        <Route path="/portfolio/write" element={<DefaultLayout><PortfolioWrite /></DefaultLayout>} />
        {/* ProtectedRoute로 보호되는 경로 */}
        {/* <Route path="/login" element={<ProtectedRoute component={Login} />} /> */}

        {/* 모든 경로가 일치하지 않을 때 */}
        <Route path="*" element={<DefaultLayout><NotFound /></DefaultLayout>} />
      </Routes>
    </>
  );
}

export default MainRouter;
