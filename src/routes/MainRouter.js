// src/routes/MainRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import SetProfile from '../pages/SetProfile';

// import ProtectedRoute from './ProtectedRoute';

function MainRouter() {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signUp" element={<SignUp/>}/>
                <Route path="/setProfile" element={<SetProfile/>}/>
                {/* ProtectedRoute로 보호되는 경로 */}
                {/* <Route path="/login" element={<ProtectedRoute component={Login} />} /> */}

                {/* 모든 경로가 일치하지 않을 때 */}
                <Route path="*" element={<h1>404 페이지를 찾을 수 없습니다</h1>} />
            </Routes>

    );
}

export default MainRouter;
