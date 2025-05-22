import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ExpertRegister() {
    const [formData, setFormData] = useState({
        career: '',
        categories: [],
        introduction: '',
        portfolio: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const categoryOptions = [
        '일러스트레이션',
        '캐릭터 디자인',
        '3D 모델링',
        '웹디자인',
        '로고 디자인',
        '포토샵 편집'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCategoryChange = (category) => {
        setFormData(prev => {
            const categories = prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...prev.categories, category];
            return { ...prev, categories };
        });
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            portfolio: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('로그인이 필요합니다.');
            }

            // FormData 객체 생성
            const submitData = new FormData();
            submitData.append('career', formData.career);
            formData.categories.forEach(category => {
                submitData.append('categories[]', category);
            });
            submitData.append('introduction', formData.introduction);
            if (formData.portfolio) {
                submitData.append('portfolio', formData.portfolio);
            }

            const response = await axios.post(
                'http://wlsrb3469.iptime.org:5000/api/expert/register',
                submitData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data.success) {
                // 사용자 정보 업데이트
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                localStorage.setItem('userInfo', JSON.stringify({
                    ...userInfo,
                    role: 'EXPERT'
                }));

                navigate('/mypage');
            } else {
                throw new Error(response.data.message || '전문가 등록에 실패했습니다.');
            }
        } catch (error) {
            console.error('전문가 등록 실패:', error);
            setError(error.response?.data?.message || error.message || '전문가 등록에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">전문가 등록</h1>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-red-600">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* 경력 */}
                            <div>
                                <label htmlFor="career" className="block text-sm font-medium text-gray-700 mb-2">
                                    경력 (년)
                                </label>
                                <input
                                    type="number"
                                    id="career"
                                    name="career"
                                    value={formData.career}
                                    onChange={handleInputChange}
                                    min="0"
                                    required
                                    className="input w-full"
                                    placeholder="경력을 입력해주세요"
                                />
                            </div>

                            {/* 전문 분야 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    전문 분야 (복수 선택 가능)
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {categoryOptions.map((category) => (
                                        <label
                                            key={category}
                                            className={`
                                                flex items-center p-3 rounded-lg border cursor-pointer
                                                ${formData.categories.includes(category)
                                                    ? 'bg-pink-50 border-pink-500 text-pink-700'
                                                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}
                                            `}
                                        >
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={formData.categories.includes(category)}
                                                onChange={() => handleCategoryChange(category)}
                                            />
                                            <span className="text-sm">{category}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* 자기소개 */}
                            <div>
                                <label htmlFor="introduction" className="block text-sm font-medium text-gray-700 mb-2">
                                    자기소개
                                </label>
                                <textarea
                                    id="introduction"
                                    name="introduction"
                                    value={formData.introduction}
                                    onChange={handleInputChange}
                                    rows="4"
                                    required
                                    className="input w-full"
                                    placeholder="전문가로서의 경험과 강점을 소개해주세요"
                                />
                            </div>

                            {/* 포트폴리오 */}
                            <div>
                                <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-2">
                                    포트폴리오 (선택사항)
                                </label>
                                <input
                                    type="file"
                                    id="portfolio"
                                    name="portfolio"
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx"
                                    className="input w-full"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    PDF, DOC, DOCX 파일 형식만 지원됩니다.
                                </p>
                            </div>

                            {/* 제출 버튼 */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`
                                        w-full py-3 px-4 rounded-lg text-white font-semibold
                                        ${isLoading
                                            ? 'bg-pink-300 cursor-not-allowed'
                                            : 'bg-pink-500 hover:bg-pink-600'}
                                    `}
                                >
                                    {isLoading ? '처리 중...' : '전문가 등록 신청'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExpertRegister; 