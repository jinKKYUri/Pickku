import { Link } from 'react-router-dom';
import { categories } from '../mocks/menuData';



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