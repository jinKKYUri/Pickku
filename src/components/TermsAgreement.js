import React, { useState, useEffect } from "react";
import "../styles/TermsAgreement.css";

function TermsAgreement({ onTermsChange, onAgree }) {
    const [agreedTerms, setAgreedTerms] = useState({
        age: false,       // [필수] 만 14세 이상
        service: false,   // [필수] 이용약관
        privacy: false,   // [필수] 개인정보 수집
        marketing: false, // [선택] 광고성 정보 수신
    });

    // ✅ useEffect로 부모에게 상태 전달
    useEffect(() => {
        if (onTermsChange) {
            onTermsChange(agreedTerms);
        }

        if (onAgree) {
            const isRequiredAgreed = agreedTerms.age && agreedTerms.service && agreedTerms.privacy;
            onAgree(isRequiredAgreed);
        }

    }, [agreedTerms, onTermsChange, onAgree]);

    // ✅ 체크박스 변경 핸들러
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setAgreedTerms((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    // ✅ 전체 동의 체크 여부 확인
    const isAllAgreed = Object.values(agreedTerms).every(Boolean);

    // ✅ 전체 동의 체크박스 클릭 시
    const handleAllAgreeChange = (e) => {
        const checked = e.target.checked;
        setAgreedTerms({
            age: checked,
            service: checked,
            privacy: checked,
            marketing: checked,
        });
    };

    return (
        <div className="terms-container">
            {/* 전체 동의 체크박스 */}
            <label className="terms-label all-agree">
                <input
                    type="checkbox"
                    name="all"
                    checked={isAllAgreed}
                    onChange={handleAllAgreeChange}
                />
                <span>전체 동의</span>
            </label>

            {/* 필수 약관 */}
            <div className="terms-group">
                <label className="terms-label">
                    <input
                        type="checkbox"
                        name="age"
                        checked={agreedTerms.age}
                        onChange={handleCheckboxChange}
                    />
                    <span>[필수] 만 14세 이상입니다</span>
                </label>

                <label className="terms-label">
                    <input
                        type="checkbox"
                        name="service"
                        checked={agreedTerms.service}
                        onChange={handleCheckboxChange}
                    />
                    <span>[필수] 이용약관 동의</span>
                </label>

                <label className="terms-label">
                    <input
                        type="checkbox"
                        name="privacy"
                        checked={agreedTerms.privacy}
                        onChange={handleCheckboxChange}
                    />
                    <span>[필수] 개인 정보 수집 및 이용 동의</span>
                </label>
            </div>

            {/* 선택 약관 */}
            <div className="terms-group optional">
                <label className="terms-label">
                    <input
                        type="checkbox"
                        name="marketing"
                        checked={agreedTerms.marketing}
                        onChange={handleCheckboxChange}
                    />
                    <span>[선택] 광고성 정보 수신 동의</span>
                </label>
            </div>
        </div>
    );
}

export default TermsAgreement;