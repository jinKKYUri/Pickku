import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { loginUser } from '../services/AuthService';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');    
    const navigate = useNavigate();

    const isFormValid = username.trim() !== "" && password.trim() !== "";

    // 로그인 버튼 클릭 시 처리
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        const userData = await loginUser(username, password); // authService 호출
        console.log('로그인 성공:', userData);
        // 로그인 성공 후, 메인 페이지로 이동
        navigate('/');
        } catch (error) {
        console.error('로그인 실패:', error.message);
        }
    };
    return (
        <div className="relative left-1/2 max-w-3xl w-full flex flex-col overflow-hidden md:mb-[60px] md:mt-[10px] md:flex-row md:rounded-3 -translate-x-1/2 border-0 sm:border-2 sm:rounded-lg sm:border-gray-250">
        <div className="relative z-20 grow rounded-t-[12px] bg-white px-[16px] py-[50px] md:rounded-0 md:px-[40px] ">
            <h2 className="mb-[38px] text-center text-xl font-semibold">로그인</h2>
            <form onSubmit={handleLogin}>
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
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                </div>
                <button
                    type="submit"
                    disabled={!isFormValid} // 유효하지 않은 경우 비활성화
                    className={`items-center justify-center flex flex-none gap-2 rounded px-4 py-2 font-semibold transition duration-300 text-white ${
                    isFormValid
                        ? "bg-pink-500"
                        : "bg-gray-300 cursor-not-allowed"
                    } mt-[38px] h-[45px] w-full`}
                >
                    로그인
                </button>
            </form>
            <div className="mt-[38px]">
            <h3 className="relative mb-[20px] text-center text-sm text-gray-500 before:absolute before:top-1/2 before:block before:w-full before:border-t before:content-empty before:-z-1">
                <span className="relative bg-white px-[12px] z-10">간편 로그인하기</span>
            </h3>
            <div className="flex justify-center gap-[25px]">
                <button className="h-[50px] w-[50px] flex both-center gap-2 border rounded-full text-sm font-semibold transition hover:border-gray-300">
                <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA4MTBfMjkg%2FMDAxNTAyMzQ1NjgxMTcx.HN5OduMJB4wLP2Ryov53lcBW-UhIkXLXZdd_SRReFAgg.mL_h394FDyN7gsATSeFOYSoDYWMPnuLPSfcLkquAIdMg.PNG.baroniter%2Fnaver_pay_img_04.png&type=a340" alt="Naver" className="h-[50px] w-[50px] rounded-full"/>
                <span className="sr-only">네이버 계정으로 로그인하기</span>
                </button>
                <button className="h-[50px] w-[50px] flex both-center gap-2 border rounded-full text-sm font-semibold transition hover:border-gray-300">
                <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20150902_266%2Fairishj01_1441151685011H1zoF_JPEG%2F11813434_10153577767937838_3231184993169792009_n.jpg&type=a340" alt="Naver" className="h-[50px] w-[50px] rounded-full"/>
                <span className="sr-only">구글 계정으로 로그인하기</span>
                </button>
            </div>
            </div>
            {/* <button className="mx-auto mt-[20px] block text-center text-sm text-gray-700 space-x-[10px]"> */}
            <div className="mx-auto mt-[20px] block text-center text-sm text-gray-700 space-x-[10px]">
            <span>계정이 없으신가요?</span>
            <Link to="/SignUp"><span className="font-semibold underline">회원가입 하기</span></Link>
            </div>
            {/* </button> */}
        </div>
        </div>
    );
}

export default LoginForm;
