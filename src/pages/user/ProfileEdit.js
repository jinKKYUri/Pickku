import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileEdit() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [formData, setFormData] = useState({
        nickname: '',
        introduction: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        // localStorage에서 사용자 정보 가져오기
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const user = JSON.parse(userInfo);
            setFormData({
                nickname: user.nickname || '',
                introduction: user.introduction || '',
                email: user.email || '',
                phone: user.phone || ''
            });
            if (user.profileImage) {
                setPreviewImage(user.profileImage);
            }
        }
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // 여기에 실제 API 호출 로직이 들어갈 예정
            // 임시로 localStorage에 저장
            const updatedUserInfo = {
                ...JSON.parse(localStorage.getItem('userInfo')),
                ...formData,
                profileImage: previewImage
            };
            localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

            navigate('/mypage/1'); // 임시로 id 1로 설정
        } catch (error) {
            console.error('프로필 수정 실패:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">프로필 수정</h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* 왼쪽: 프로필 이미지 */}
                            <div className="md:w-64 flex flex-col items-center space-y-4">
                                <div className="relative group w-full aspect-square">
                                    <div className="w-full h-full rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden">
                                        {previewImage ? (
                                            <img
                                                src={previewImage}
                                                alt="프로필 미리보기"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                    <label
                                        htmlFor="profile-image"
                                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl cursor-pointer"
                                    >
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id="profile-image"
                                    />
                                </div>
                                <p className="text-sm text-gray-500 text-center">프로필 이미지를 변경하려면 클릭하세요</p>
                            </div>

                            {/* 오른쪽: 입력 필드들 */}
                            <div className="flex-1 space-y-6">
                                {/* 닉네임 입력 */}
                                <div className="space-y-2">
                                    <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
                                        닉네임
                                    </label>
                                    <input
                                        type="text"
                                        id="nickname"
                                        name="nickname"
                                        value={formData.nickname}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                        placeholder="닉네임을 입력하세요"
                                    />
                                </div>

                                {/* 자기소개 입력 */}
                                <div className="space-y-2">
                                    <label htmlFor="introduction" className="block text-sm font-medium text-gray-700">
                                        자기소개
                                    </label>
                                    <textarea
                                        id="introduction"
                                        name="introduction"
                                        value={formData.introduction}
                                        onChange={handleInputChange}
                                        rows="4"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
                                        placeholder="자기소개를 입력하세요"
                                    />
                                </div>

                                {/* 이메일 표시 (읽기 전용) */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        이메일
                                    </label>
                                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500">
                                        {formData.email || '등록된 이메일이 없습니다'}
                                    </div>
                                </div>

                                {/* 연락처 표시 (읽기 전용) */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        연락처
                                    </label>
                                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500">
                                        {formData.phone || '등록된 연락처가 없습니다'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 버튼 영역 */}
                        <div className="flex justify-end space-x-4 pt-8">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-6 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                취소
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-6 py-2.5 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors disabled:bg-pink-300 disabled:cursor-not-allowed"
                            >
                                {isLoading ? '저장 중...' : '저장하기'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProfileEdit; 