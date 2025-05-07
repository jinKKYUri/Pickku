import React from 'react';
import { Link } from 'react-router-dom';

function SignUpComplete() {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                {/* 로고 */}
                <div>
                    <Link to="/" className="inline-block">
                        <h1 className="text-4xl font-extrabold text-foreground">Pickku</h1>
                    </Link>
                </div>

                {/* 성공 아이콘 */}
                <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100">
                    <svg
                        className="h-16 w-16 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                {/* 축하 메시지 */}
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        회원가입 완료!
                    </h2>
                    <p className="mt-2 text-lg text-gray-600">
                        Pickku의 회원이 되신 것을 환영합니다
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                        이제 Pickku의 다양한 서비스를 이용하실 수 있습니다
                    </p>
                </div>

                {/* 버튼 영역 */}
                <div className="mt-8 space-y-4">
                    <Link
                        to="/login"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    >
                        로그인하기
                    </Link>
                    <Link
                        to="/"
                        className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    >
                        홈으로 가기
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignUpComplete;