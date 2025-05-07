import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
            <div className="text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="text-9xl font-bold text-primary">404</h1>
                    <h2 className="text-2xl font-semibold text-foreground">페이지를 찾을 수 없습니다</h2>
                    <p className="text-muted-foreground">
                        요청하신 페이지가 삭제되었거나 잘못된 경로입니다.
                    </p>
                </div>
                <div className="space-y-4">
                    <Link
                        to="/"
                        className="btn btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-lg w-full"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        메인으로 돌아가기
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="btn btn-outline block w-full px-6 py-3 text-lg"
                    >
                        이전 페이지로 돌아가기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotFound; 