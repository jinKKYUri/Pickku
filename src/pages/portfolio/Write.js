import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PortfolioWrite = () => {
    const navigate = useNavigate();
    const [mainImages, setMainImages] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        category: '일러스트',
        description: '',
        basePrice: '',
        options: [
            {
                groupName: '',
                items: [{ name: '', price: '' }]
            }
        ]
    });

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            ['blockquote', 'code-block'],
            ['link', 'image', 'video'],
            ['clean']
        ],
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'list', 'bullet',
        'align',
        'script',
        'blockquote', 'code-block',
        'link', 'image', 'video'
    ];

    const categories = ['일러스트', '디지털아트', '수채화', '유화', '캘리그라피'];

    const handleMainImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + mainImages.length > 3) {
            alert('대표 이미지는 최대 3장까지 등록 가능합니다.');
            return;
        }
        const urls = files.map(file => URL.createObjectURL(file));
        setMainImages(prev => [...prev, ...urls]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDescriptionChange = (content) => {
        setFormData(prev => ({
            ...prev,
            description: content
        }));
    };

    const addOptionGroup = () => {
        setFormData(prev => ({
            ...prev,
            options: [...prev.options, { groupName: '', items: [{ name: '', price: '' }] }]
        }));
    };

    const removeOptionGroup = (groupIndex) => {
        setFormData(prev => ({
            ...prev,
            options: prev.options.filter((_, index) => index !== groupIndex)
        }));
    };

    const addOptionItem = (groupIndex) => {
        setFormData(prev => {
            const newOptions = [...prev.options];
            newOptions[groupIndex].items.push({ name: '', price: '' });
            return { ...prev, options: newOptions };
        });
    };

    const removeOptionItem = (groupIndex, itemIndex) => {
        setFormData(prev => {
            const newOptions = [...prev.options];
            newOptions[groupIndex].items = newOptions[groupIndex].items.filter((_, index) => index !== itemIndex);
            return { ...prev, options: newOptions };
        });
    };

    const handleOptionChange = (groupIndex, itemIndex, field, value) => {
        setFormData(prev => {
            const newOptions = [...prev.options];
            if (field === 'groupName') {
                newOptions[groupIndex].groupName = value;
            } else {
                newOptions[groupIndex].items[itemIndex][field] = value;
            }
            return { ...prev, options: newOptions };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: API 연동
        console.log('제출된 데이터:', { ...formData, mainImages });
        navigate('/portfolio/list');
    };

    const handlePreview = () => {
        // TODO: 미리보기 로직 구현
        console.log('미리보기:', { ...formData, mainImages });
    };

    const handleTempSave = () => {
        // TODO: 임시저장 로직 구현
        const tempData = { ...formData, mainImages };
        localStorage.setItem('portfolioTempData', JSON.stringify(tempData));
        alert('임시저장되었습니다.');
    };

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1200px] mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">포트폴리오 등록</h1>
                    <p className="mt-2 text-gray-600">작품 정보를 입력해주세요.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* 기본 정보 섹션 */}
                    <div className="bg-white rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">기본 정보</h2>

                        {/* 대표 이미지 업로드 */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                대표 이미지 (최대 3장)
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                                {mainImages.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={image}
                                            alt={`Main ${index + 1}`}
                                            className="h-32 w-full object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setMainImages(prev => prev.filter((_, i) => i !== index))}
                                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                                {mainImages.length < 3 && (
                                    <label className="h-32 flex items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-gray-400">
                                        <div className="text-center">
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <span className="mt-2 block text-sm text-gray-600">이미지 추가</span>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            multiple
                                            onChange={handleMainImageChange}
                                        />
                                    </label>
                                )}
                            </div>
                            <p className="text-xs text-gray-500">
                                PNG, JPG, GIF up to 10MB
                            </p>
                        </div>

                        {/* 제목 입력 */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                제목
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="작품의 제목을 입력해주세요"
                            />
                        </div>

                        {/* 카테고리 선택 */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                카테고리
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* 설명 입력 */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                작품 설명
                            </label>
                            <div className="h-96"> {/* 높이를 h-96으로 증가 */}
                                <ReactQuill
                                    value={formData.description}
                                    onChange={handleDescriptionChange}
                                    modules={modules}
                                    formats={formats}
                                    className="h-80" /* 에디터 자체의 높이도 증가 */
                                    placeholder="작품에 대한 상세한 설명을 입력해주세요"
                                />
                            </div>
                        </div>

                        {/* 기본 가격 입력 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                기본 가격
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="basePrice"
                                    value={formData.basePrice}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="0"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500">원</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 옵션 섹션 */}
                    <div className="bg-white rounded-xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">옵션 설정</h2>
                            <button
                                type="button"
                                onClick={addOptionGroup}
                                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500"
                            >
                                + 옵션 그룹 추가
                            </button>
                        </div>

                        {formData.options.map((group, groupIndex) => (
                            <div key={groupIndex} className="mb-8 pb-8 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0">
                                <div className="flex justify-between items-center mb-4">
                                    <input
                                        type="text"
                                        value={group.groupName}
                                        onChange={(e) => handleOptionChange(groupIndex, null, 'groupName', e.target.value)}
                                        className="text-lg font-medium px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="옵션 그룹명 (예: 사이즈, 프레임 등)"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeOptionGroup(groupIndex)}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        삭제
                                    </button>
                                </div>

                                {group.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="flex gap-4 mb-4">
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => handleOptionChange(groupIndex, itemIndex, 'name', e.target.value)}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="옵션명"
                                        />
                                        <div className="relative w-48">
                                            <input
                                                type="number"
                                                value={item.price}
                                                onChange={(e) => handleOptionChange(groupIndex, itemIndex, 'price', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="추가 가격"
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500">원</span>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeOptionItem(groupIndex, itemIndex)}
                                            className="text-red-500 hover:text-red-600 px-2"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => addOptionItem(groupIndex)}
                                    className="text-sm text-blue-600 hover:text-blue-500"
                                >
                                    + 옵션 추가
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* 제출 버튼 */}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            취소
                        </button>
                        <button
                            type="button"
                            onClick={handleTempSave}
                            className="flex-1 px-4 py-3 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                            임시저장
                        </button>
                        <button
                            type="button"
                            onClick={handlePreview}
                            className="flex-1 px-4 py-3 text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            미리보기
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            등록하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PortfolioWrite;