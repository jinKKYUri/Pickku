// jk_fe/src/pages/SignUp.js

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, } from 'react-router-dom';
import { getUserSeq, setProfile } from '../services/AuthService';


function InputBox(props) {
    <div>
        <label className="text-sm font-semibold block sr-only" htmlFor="email">
            {props.label}
            <span className="ml-1 inline-block text-red-500">
                <span className="sr-only">필수 항목</span>
            </span>
        </label>
        <input
            id={props.id}
            className="block w-full h-[41px] rounded border bg-white px-4 py-2 ring-inset transition hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 disabled:bg-gray-50 disabled:text-gray-400 disabled:placeholder-gray-300 focus:ring-gray-500"
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
        />
    </div>  
}


//프로필 저장
function SetProfile() {
    const [userSeq, setUserSeq] = useState('');
    const [userNick, setUserNick] = useState('');
    const [userContent, setUserContent] = useState('');
    const [userImg, setUserImg] = useState('');
    const location = useLocation();
    const { userId } = location.state || {};

    const navigate = useNavigate();

    const isFormValid = userNick.trim() !== "";
    // const isFormValid = userNick.trim() !== "" && userContent.trim() !== "";

    useEffect(() => {
        const getSeq = async () => {
            try {
                const response = await getUserSeq(userId);
                setUserSeq(response);
            } catch (error) {
                console.log(error);
                navigate('/');
            }
        }
        getSeq();
    }, [userId])


    const handleSetProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await setProfile(userSeq, userNick, userContent, userImg); // signupUser 호출
            // const response = await getUserSeq(userId);
            // console.log(response.data)
            // setUserSeq(response)
            navigate('/');
        } catch (error) {
            console.log(error)
            console.error('로그인 실패:', error.message);
        }
    };
    return (
        <div className="relative left-1/2 max-w-3xl w-full flex flex-col overflow-hidden md:mb-[60px] md:mt-[10px] md:flex-row md:rounded-3 -translate-x-1/2 border-0 sm:border-2 sm:rounded-lg sm:border-gray-250">
            <div className="relative z-20 grow rounded-t-[12px] bg-white px-[16px] py-[50px] md:rounded-0 md:px-[40px] ">
                <h2 className="mb-[38px] text-center text-xl font-semibold">프로필</h2>
                <form onSubmit={handleSetProfile}>
                    <div className="space-y-[10px]">
                        {userId && <p style={{ color: 'red' }}>{userId}</p>}
                        {userSeq && <p style={{ color: 'red' }}>{userSeq}</p>}
                        <InputBox label='닉네임' id='userNick' type='text' name='userNick' placeholder='닉네임' value={userNick} onChange={(e) => setUserNick(e.target.value)}/>
                        <div>
                            <label className="text-sm font-semibold block sr-only" htmlFor="email">
                                닉네임
                                <span className="ml-1 inline-block text-red-500">
                                    <span className="sr-only">필수 항목</span>
                                </span>
                            </label>
                            <input
                                id="userNick"
                                className="block w-full h-[41px] rounded border bg-white px-4 py-2 ring-inset transition hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 disabled:bg-gray-50 disabled:text-gray-400 disabled:placeholder-gray-300 focus:ring-gray-500"
                                type="text"
                                name="userNick"
                                placeholder="닉네임"
                                value={userNick}
                                onChange={(e) => setUserNick(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold block sr-only" htmlFor="password">
                                자기소개
                                <span className="ml-1 inline-block text-red-500">* <span className="sr-only">필수 항목</span>
                                </span>
                            </label>
                            <input
                                id="userContent"
                                className="block w-full h-[41px] rounded border bg-white px-4 py-2 ring-inset transition hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 disabled:bg-gray-50 disabled:text-gray-400 disabled:placeholder-gray-300 focus:ring-gray-500"
                                type="text"
                                name="userContent"
                                placeholder="자기소개"
                                value={userContent}
                                onChange={(e) => setUserContent(e.target.value)}
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