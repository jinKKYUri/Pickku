import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { portfolios } from '../../mocks/portfolioData';
import test1 from '../../assets/images/test1.jpg';

const PortfolioList = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [selectedSort, setSelectedSort] = useState('최신순');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const categories = ['전체', '일러스트', '디지털아트', '수채화', '유화', '캘리그라피'];
    const sortOptions = ['최신순', '인기순', '조회순', '가격 낮은순', '가격 높은순'];

    // 페이지네이션을 위한 포트폴리오 데이터 분할
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = portfolios.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(portfolios.length / itemsPerPage);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* 헤더 섹션 */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">작가 포트폴리오</h1>
                    <div className="flex gap-4">
                        <select
                            value={selectedSort}
                            onChange={(e) => setSelectedSort(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {sortOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* 카테고리 필터 */}
                <div className="flex flex-wrap gap-4 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                                ${selectedCategory === category
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* 포트폴리오 그리드 */}
                <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-6">
                    {currentItems.map((portfolio) => (
                        <div
                            key={portfolio.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                            onClick={() => navigate(`/portfolio/${portfolio.id}`)}
                        >
                            {/* 썸네일 이미지 */}
                            <div className="relative">
                                <img
                                    src={test1}
                                    alt={portfolio.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                                    {portfolio.category}
                                </div>
                            </div>

                            {/* 포트폴리오 정보 */}
                            <div className="p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                                    <span className="font-medium text-gray-900">{portfolio.artist}</span>
                                    <div className="flex items-center ml-auto">
                                        <span className="text-yellow-400">★</span>
                                        <span className="ml-1 text-sm text-gray-600">{portfolio.rating}</span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {portfolio.title}
                                </h3>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {portfolio.description}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className="font-semibold text-blue-600">{portfolio.price}</span>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                            </svg>
                                            {portfolio.views}
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                                            </svg>
                                            {portfolio.likes}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 페이지네이션 */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-8 gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50"
                        >
                            이전
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 rounded-lg ${currentPage === index + 1
                                    ? 'bg-blue-600 text-white'
                                    : 'border border-gray-300'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50"
                        >
                            다음
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PortfolioList;