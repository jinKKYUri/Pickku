import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { portfolios } from '../../mocks/portfolioData';
import test1 from '../../assets/images/test1.jpg';

const PortfolioDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [portfolio, setPortfolio] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [quantity, setQuantity] = useState(1);

    const optionGroups = [
        {
            id: 1,
            name: '사이즈 선택',
            options: [
                { id: 1, name: 'A4', price: 0 },
                { id: 2, name: 'A3', price: 30000 },
                { id: 3, name: 'A2', price: 50000 }
            ]
        },
        {
            id: 2,
            name: '프레임 선택',
            options: [
                { id: 1, name: '기본 프레임', price: 0 },
                { id: 2, name: '우드 프레임', price: 40000 },
                { id: 3, name: '메탈 프레임', price: 60000 }
            ]
        },
        {
            id: 3,
            name: '마감 선택',
            options: [
                { id: 1, name: '무광', price: 0 },
                { id: 2, name: '유광', price: 20000 },
                { id: 3, name: '캔버스', price: 40000 }
            ]
        },
        {
            id: 4,
            name: '포장 옵션',
            options: [
                { id: 1, name: '기본 포장', price: 0 },
                { id: 2, name: '선물 포장', price: 15000 },
                { id: 3, name: '고급 케이스', price: 30000 }
            ]
        },
        {
            id: 5,
            name: '액자 매트',
            options: [
                { id: 1, name: '매트 없음', price: 0 },
                { id: 2, name: '화이트 매트', price: 25000 },
                { id: 3, name: '블랙 매트', price: 25000 }
            ]
        },
        {
            id: 6,
            name: '추가 서비스',
            options: [
                { id: 1, name: '기본', price: 0 },
                { id: 2, name: '디지털 파일 제공', price: 50000 },
                { id: 3, name: '작가 친필 서명', price: 30000 }
            ]
        }
    ];

    useEffect(() => {
        const foundPortfolio = portfolios.find(p => p.id === parseInt(id));
        if (!foundPortfolio) {
            navigate('/portfolio');
            return;
        }
        setPortfolio(foundPortfolio);
        // 각 옵션 그룹의 첫 번째 옵션을 기본값으로 설정
        const defaultOptions = {};
        optionGroups.forEach(group => {
            defaultOptions[group.id] = group.options[0].id;
        });
        setSelectedOptions(defaultOptions);
    }, [id, navigate]);

    if (!portfolio) {
        return <div className="min-h-screen flex items-center justify-center">로딩중...</div>;
    }

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= 10) {
            setQuantity(newQuantity);
        }
    };

    const calculateTotalPrice = () => {
        let basePrice = parseInt(portfolio.price.replace(/[^0-9]/g, ''));
        let optionsPrice = 0;

        Object.entries(selectedOptions).forEach(([groupId, optionId]) => {
            const group = optionGroups.find(g => g.id === parseInt(groupId));
            const option = group.options.find(o => o.id === optionId);
            optionsPrice += option.price;
        });

        return (basePrice + optionsPrice) * quantity;
    };

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* 뒤로가기 버튼 */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 mb-8 hover:text-gray-900 transition-colors"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    돌아가기
                </button>

                {/* 메인 컨텐츠 섹션 */}
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                    {/* 왼쪽 이미지 섹션 */}
                    <div className="w-full md:flex-1">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <img
                                src={test1}
                                alt={portfolio.title}
                                className="w-full h-[400px] md:h-[600px] object-cover"
                            />
                        </div>
                    </div>

                    {/* 오른쪽 정보 섹션 */}
                    <div className="w-full md:flex-1">
                        <div className="bg-white rounded-xl shadow-lg p-8 h-full">
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-3xl font-bold text-gray-900">{portfolio.title}</h1>
                                <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                                    {portfolio.category}
                                </span>
                            </div>

                            {/* 작가 정보 */}
                            <div className="flex items-center mb-8 pb-8 border-b border-gray-200">
                                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">{portfolio.artist}</h2>
                                    <div className="flex items-center mt-1">
                                        <span className="text-yellow-400 mr-1">★</span>
                                        <span className="text-gray-600">{portfolio.rating}</span>
                                    </div>
                                </div>
                            </div>

                            {/* 통계 및 가격 정보 */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-8 border-b border-gray-200 gap-4">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-600">{portfolio.views} 조회</span>
                                    </div>
                                    <button
                                        onClick={() => setIsLiked(!isLiked)}
                                        className="flex items-center"
                                    >
                                        <svg
                                            className={`w-5 h-5 mr-2 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
                                            fill={isLiked ? 'currentColor' : 'none'}
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        <span className="text-gray-600">{portfolio.likes} 좋아요</span>
                                    </button>
                                </div>
                                <div className="text-2xl font-bold text-blue-600">
                                    {portfolio.price}
                                </div>
                            </div>

                            {/* 주문 옵션 */}
                            <div className="mb-8">
                                <div className="mb-4 max-h-[300px] overflow-y-auto">
                                    {optionGroups.map(group => (
                                        <div key={group.id} className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {group.name}
                                            </label>
                                            <select
                                                value={selectedOptions[group.id]}
                                                onChange={(e) => setSelectedOptions({
                                                    ...selectedOptions,
                                                    [group.id]: parseInt(e.target.value)
                                                })}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            >
                                                {group.options.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.name} {option.price > 0 ? `(+${option.price.toLocaleString()}원)` : ''}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">수량</label>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => handleQuantityChange(-1)}
                                            className="px-3 py-2 border border-gray-300 rounded-l-lg hover:bg-gray-100"
                                        >-</button>
                                        <span className="px-4 py-2 border-t border-b border-gray-300">{quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(1)}
                                            className="px-3 py-2 border border-gray-300 rounded-r-lg hover:bg-gray-100"
                                        >+</button>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
                                    <span className="text-gray-700">총 결제금액</span>
                                    <span className="text-xl font-bold text-blue-600">
                                        {calculateTotalPrice().toLocaleString()}원
                                    </span>
                                </div>
                            </div>

                            {/* 주문 버튼 */}
                            <div className="flex flex-col gap-4">
                                <button className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors">
                                    주문하기
                                </button>
                                <div className="flex gap-4">
                                    <button className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-lg hover:bg-gray-200 transition-colors">
                                        장바구니
                                    </button>
                                    <button className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-lg hover:bg-gray-200 transition-colors">
                                        문의하기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 작품 설명 섹션 */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">작품 설명</h3>
                    <p className="text-gray-600 leading-relaxed">
                        {portfolio.description}
                    </p>
                </div>

                {/* 추천 작품 섹션 */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">이 작가의 다른 작품</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {portfolios
                            .filter(p => p.artist === portfolio.artist && p.id !== portfolio.id)
                            .slice(0, 3)
                            .map(relatedPortfolio => (
                                <div
                                    key={relatedPortfolio.id}
                                    className="bg-gray-50 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                                    onClick={() => navigate(`/portfolio/${relatedPortfolio.id}`)}
                                >
                                    <img
                                        src={relatedPortfolio.thumbnail}
                                        alt={relatedPortfolio.title}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4">
                                        <h4 className="font-medium text-gray-900">{relatedPortfolio.title}</h4>
                                        <p className="text-sm text-gray-500 mt-1">{relatedPortfolio.price}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioDetail;