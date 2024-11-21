// jk_fe/src/pages/SignUp.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setProfile } from '../services/AuthService';


//프로필 저장
function SetProfile() {
    const [nickname, setNickName] = useState('');
    const [content, setContent] = useState('');
    const [profileImg,setProfileImg] = useState('');
    const navigate = useNavigate();

    const isFormValid = nickname.trim() !== "" && content.trim() !== "";


    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
                const response = await setProfile(nickname,content,profileImg); // signupUser 호출
            
        } catch (error) {
            console.error('로그인 실패:', error.message);
        }
    };
    return (
        <div className="relative left-1/2 max-w-3xl w-full flex flex-col overflow-hidden md:mb-[60px] md:mt-[10px] md:flex-row md:rounded-3 -translate-x-1/2 border-0 sm:border-2 sm:rounded-lg sm:border-gray-250">
            <div className="relative z-20 grow rounded-t-[12px] bg-white px-[16px] py-[50px] md:rounded-0 md:px-[40px] ">
                <h2 className="mb-[38px] text-center text-xl font-semibold">회원가입</h2>
                <form onSubmit={handleSignUp}>
                    <div className="space-y-[10px]">
                        <div>
                            <label className="text-sm font-semibold block sr-only" htmlFor="email">
                                닉네임
                                <span className="ml-1 inline-block text-red-500">
                                    <span className="sr-only">필수 항목</span>
                                </span>
                            </label>
                            <input
                                id="nickname"
                                className="block w-full h-[41px] rounded border bg-white px-4 py-2 ring-inset transition hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 disabled:bg-gray-50 disabled:text-gray-400 disabled:placeholder-gray-300 focus:ring-gray-500"
                                type="text"
                                name="nickname"
                                placeholder="닉네임"
                                value={nickname}
                                onChange={(e) => setNickName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold block sr-only" htmlFor="password">
                                자기소개
                                <span className="ml-1 inline-block text-red-500">* <span className="sr-only">필수 항목</span>
                                </span>
                            </label>
                            <input
                                id="content"
                                className="block w-full h-[41px] rounded border bg-white px-4 py-2 ring-inset transition hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 disabled:bg-gray-50 disabled:text-gray-400 disabled:placeholder-gray-300 focus:ring-gray-500"
                                type="text"
                                name="content"
                                placeholder="자기소개"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={!isFormValid} // 유효하지 않은 경우 비활성화
                        className={`items-center justify-center flex flex-none gap-2 rounded px-4 py-2 font-semibold transition duration-300 text-white ${isFormValid
                            ? "bg-pink-500"
                            : "bg-gray-300 cursor-not-allowed"
                            } mt-[38px] h-[45px] w-full`}
                    >
                        프로필 저장
                    </button>
                </form>
            </div>
        </div>
    );
}


export default SetProfile;