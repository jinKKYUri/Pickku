// jk_fe/src/pages/SignUp.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpUser } from '../services/AuthService';


//회원가입
function SignUp() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();

    const isFormValid = userId.trim() !== "" && password.trim() !== "";


    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            if(password === checkPassword){
                const response = await signUpUser(userId, password,email,phone); // signupUser 호출
                navigate("/setProfile")

            }else{
                alert("패스워드가 일치하지 않습니다.")
            }
            
        } catch (error) {
            setError(error.response?.data?.message || '회원가입 실패');
            //setError(error.response);
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
                                이메일 주소
                                <span className="ml-1 inline-block text-red-500">
                                    <span className="sr-only">필수 항목</span>
                                </span>
                            </label>
                            <input
                                id="userId"
                                className="block w-full h-[41px] rounded border bg-white px-4 py-2 ring-inset transition hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 disabled:bg-gray-50 disabled:text-gray-400 disabled:placeholder-gray-300 focus:ring-gray-500"
                                type="text"
                                name="userId"
                                placeholder="아이디"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold block sr-only" htmlFor="password">
                                비밀번호
                                <span className="ml-1 inline-block text-red-500">* <span className="sr-only">필수 항목</span>
                                </span>
                            </label>
                            <input
                                id="password"
                                className="block w-full h-[41px] rounded border bg-white px-4 py-2 ring-inset transition hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 disabled:bg-gray-50 disabled:text-gray-400 disabled:placeholder-gray-300 focus:ring-gray-500"
                                type="password"
                                name="password"
                                placeholder="비밀번호"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold block sr-only" htmlFor="password">
                                비밀번호 확인
                                <span className="ml-1 inline-block text-red-500">* <span className="sr-only">필수 항목</span>
                                </span>
                            </label>
                            <input
                                id="password"
                                className="block w-full h-[41px] rounded border bg-white px-4 py-2 ring-inset transition hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 disabled:bg-gray-50 disabled:text-gray-400 disabled:placeholder-gray-300 focus:ring-gray-500"
                                type="password"
                                name="password"
                                placeholder="비밀번호 확인"
                                value={checkPassword}
                                onChange={(e) => setCheckPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold block sr-only" htmlFor="email">
                                이메일
                                <span className="ml-1 inline-block text-red-500">* <span className="sr-only">필수 항목</span>
                                </span>
                            </label>
                            <input
                                id="email"
                                className="block w-full h-[41px] rounded border bg-white px-4 py-2 ring-inset transition hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 disabled:bg-gray-50 disabled:text-gray-400 disabled:placeholder-gray-300 focus:ring-gray-500"
                                type="email"
                                name="email"
                                placeholder="이메일"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold block sr-only" htmlFor="password">
                                핸드폰
                                <span className="ml-1 inline-block text-red-500">* <span className="sr-only">필수 항목</span>
                                </span>
                            </label>
                            <input
                                id="phone"
                                className="block w-full h-[41px] rounded border bg-white px-4 py-2 ring-inset transition hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 disabled:bg-gray-50 disabled:text-gray-400 disabled:placeholder-gray-300 focus:ring-gray-500"
                                type='text'
                                name="phone"
                                placeholder="핸드폰"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button
                        type="submit"
                        disabled={!isFormValid} // 유효하지 않은 경우 비활성화
                        className={`items-center justify-center flex flex-none gap-2 rounded px-4 py-2 font-semibold transition duration-300 text-white ${isFormValid
                            ? "bg-pink-500"
                            : "bg-gray-300 cursor-not-allowed"
                            } mt-[38px] h-[45px] w-full`}
                    >
                        가입하기
                    </button>
                </form>
            </div>
        </div>
    );
}


export default SignUp;