import React from 'react';
import { Link } from 'react-router-dom';

function SignUpComplete() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

    return (
        <div className="w-full max-w-md mx-auto space-y-8 p-6">
            <div className="text-center">
                <Link to="/" className="inline-block mb-6">
                    <h1 className="text-4xl font-extrabold text-foreground">Pickku</h1>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <svg
                        className="w-8 h-8 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                        회원가입이 완료되었습니다!
                    </h2>
                    <p className="text-gray-600">
                        Pickku의 회원이 되신 것을 환영합니다.
                    </p>
                </div>

                <div className="space-y-3">
                    <Link
                        to="/"
                        className="block w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    >
                        홈으로 이동
                    </Link>
                    <Link
                        to="/login"
                        className="block w-full py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    >
                        로그인하기
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignUpComplete;