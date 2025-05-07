import { Link } from 'react-router-dom';

const categories = [
    {
        name: "캐릭터 일러스트",
        path: "/category/character",
        description: "개성 있는 캐릭터 디자인과 일러스트레이션",
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        name: "일러스트",
        path: "/category/illustration",
        description: "다양한 스타일의 일러스트레이션 작업",
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
        )
    },
    {
        name: "버추어 3D",
        path: "/category/3d",
        description: "3D 모델링 및 버추얼 캐릭터 제작",
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
        )
    },
    {
        name: "영상",
        path: "/category/video",
        description: "모션 그래픽과 영상 제작",
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        name: "음향",
        path: "/category/audio",
        description: "음악, 효과음 및 오디오 제작",
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
        )
    },
];

function Categories() {
    return (
        <div className="container mx-auto px-4 py-12">
            {/* 헤더 */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-foreground mb-4">카테고리</h1>
                <p className="text-lg text-muted-foreground">
                    다양한 분야의 전문가들이 제공하는 서비스를 만나보세요
                </p>
            </div>

            {/* 카테고리 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category) => (
                    <Link
                        key={category.path}
                        to={category.path}
                        className="group block p-6 bg-background rounded-lg border border-border hover:border-primary transition-colors duration-200"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="text-muted-foreground group-hover:text-primary transition-colors duration-200">
                                {category.icon}
                            </div>
                            <h3 className="mt-4 text-xl font-semibold text-foreground">
                                {category.name}
                            </h3>
                            <p className="mt-2 text-muted-foreground">
                                {category.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* 하단 CTA */}
            <div className="mt-16 text-center">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                    원하시는 카테고리를 찾지 못하셨나요?
                </h2>
                <p className="text-muted-foreground mb-8">
                    픽쿠는 계속해서 새로운 카테고리를 추가하고 있습니다.
                </p>
                <Link
                    to="/request"
                    className="btn btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-lg"
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
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    디자인 요청하기
                </Link>
            </div>
        </div>
    );
}

export default Categories; 