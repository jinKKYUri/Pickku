// jk_fe/src/pages/SignUp.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SetProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname: '',
    profileImage: null,
    introduction: '',
    interests: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 프로필 설정 완료 로직 구현 예정
    navigate('/');
  };

  const interests = ['디자인', '일러스트', '웹개발', 'UI/UX', '3D 모델링', '애니메이션'];

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">프로필 설정</h2>
        <p className="mt-2 text-sm text-gray-600">
          프로필을 설정하고 Pickku를 시작해보세요
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
                {formData.profileImage ? (
                  <img
                    src={URL.createObjectURL(formData.profileImage)}
                    alt="Profile preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </div>
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 bg-pink-500 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-pink-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </label>
              <input
                id="profile-image"
                name="profileImage"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
                닉네임
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="nickname"
                id="nickname"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-pink-500 focus:border-pink-500"
                value={formData.nickname}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="introduction" className="block text-sm font-medium text-gray-700">
                자기소개
              </label>
              <textarea
                id="introduction"
                name="introduction"
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-pink-500 focus:border-pink-500"
                value={formData.introduction}
                onChange={handleInputChange}
                placeholder="자신을 소개해주세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                관심사
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interests.map((interest) => (
                  <label
                    key={interest}
                    className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors
                      ${formData.interests.includes(interest)
                        ? 'bg-pink-50 border-pink-500 text-pink-700'
                        : 'hover:bg-gray-50 border-gray-200'
                      }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={formData.interests.includes(interest)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData(prev => ({
                            ...prev,
                            interests: [...prev.interests, interest]
                          }));
                        } else {
                          setFormData(prev => ({
                            ...prev,
                            interests: prev.interests.filter(i => i !== interest)
                          }));
                        }
                      }}
                    />
                    <span className="text-sm font-medium">{interest}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
            >
              설정 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetProfile;
