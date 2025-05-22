import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';


function MyPage() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://wlsrb3469.iptime.org:5000/api/users/mypage', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setUserInfo(response.data.userInfo);
          console.log(response.data);
        } else {
          throw new Error(response.data.message?.error || '사용자 정보를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('사용자 정보 조회 실패:', error);
        setError(error.response?.data?.message?.error || error.message || '사용자 정보를 불러오는데 실패했습니다.');

        // 토큰이 만료되었거나 유효하지 않은 경우
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('userInfo');
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  // 휴대폰 인증 모달
  const PhoneVerificationModal = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [step, setStep] = useState(1); // 1: 번호입력, 2: 인증번호입력
    const [timer, setTimer] = useState(0);

    useEffect(() => {
      if (timer > 0) {
        const interval = setInterval(() => {
          setTimer(prev => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
      }
    }, [timer]);

    const handleSendVerification = () => {
      // TODO: 실제 인증번호 발송 로직 구현
      setStep(2);
      setTimer(180); // 3분
      alert('인증번호가 발송되었습니다.');
    };

    const handleVerify = () => {
      // TODO: 실제 인증번호 확인 로직 구현
      setShowVerificationModal(false);
      alert('인증이 완료되었습니다.');
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">휴대폰 번호 인증</h3>
            <button onClick={() => setShowVerificationModal(false)} className="text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">휴대폰 번호</label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="'-' 없이 입력해주세요"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <button
                    onClick={handleSendVerification}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                  >
                    인증번호 발송
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">인증번호</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="인증번호 6자리"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <button
                    onClick={handleVerify}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                  >
                    확인
                  </button>
                </div>
                {timer > 0 && (
                  <p className="text-sm text-red-500 mt-1">
                    남은 시간: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 사용자 정보 사이드바 - 스티키 적용 */}
          <div className="md:w-1/3">
            <div className="sticky top-[120px]">
              <section className="bg-white border rounded-lg p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 rounded-lg bg-gray-200 flex items-center justify-center">
                    {userInfo?.profileImage ? (
                      <img
                        src={userInfo.profileImage}
                        alt="프로필"
                        className="w-full h-full rounded-lg object-cover"
                      />
                    ) : (
                      <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h1 className="text-2xl font-semibold">{userInfo?.nickname || '사용자'}</h1>
                    </div>
                    <p className="text-gray-600 mt-1">
                      <span className={`px-3 py-1 text-sm rounded-full ${userInfo?.role === 'EXPERT' ? 'bg-pink-100 text-pink-700' : 'bg-gray-100 text-gray-700'}`}>
                        {userInfo?.role === 'EXPERT' ? '전문가' : '의뢰인'}
                      </span>
                    </p>
                    {userInfo?.role === 'EXPERT' && userInfo?.expertInfo && (
                      <div className="mt-3">
                        <p className="text-gray-600">{userInfo.expertInfo.career}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {userInfo.expertInfo.categories.map((category, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-sm rounded-md">
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 휴대폰 인증 상태 표시 */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {userInfo?.phoneVerified ? (
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      )}
                      <h3 className="text-sm font-medium text-gray-900">휴대폰 인증</h3>
                    </div>
                    {!userInfo?.phoneVerified && (
                      <button
                        onClick={() => setShowVerificationModal(true)}
                        className="px-3 py-1.5 text-sm text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-colors"
                      >
                        인증하기
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {userInfo?.phoneVerified
                      ? '휴대폰 인증이 완료되었습니다.'
                      : '원활한 서비스 이용을 위해 휴대폰 인증이 필요합니다.'}
                  </p>
                </div>

                {/* 전문가 계정 전환 섹션 - 일반 회원에게만 표시 */}
                {userInfo?.role === 'USER' && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <h3 className="text-sm font-medium text-gray-900">전문가 계정 전환</h3>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      전문가로 활동하고 싶으신가요? 포트폴리오를 등록하고 전문가로 활동해보세요.
                    </p>
                    <button
                      onClick={() => navigate('/expert/register')}
                      className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <span>전문가 등록하기</span>
                    </button>
                  </div>
                )}

                {/* 포트폴리오 작성 섹션 - 전문가 회원에게만 표시 */}
                {userInfo?.role === 'EXPERT' && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <h3 className="text-sm font-medium text-gray-900">포트폴리오 작성</h3>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      새로운 포트폴리오를 작성하고 더 많은 고객을 만나보세요.
                    </p>
                    <button
                      onClick={() => navigate('/portfolio/write')}
                      className="mt-4 w-full px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      <span>새 포트폴리오 작성</span>
                    </button>
                  </div>
                )}

                {/* 계정 설정 버튼들 */}
                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => navigate('/profileEdit')}
                    className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors flex items-center justify-between"
                  >
                    <span>프로필 수정</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  {userInfo?.role === 'EXPERT' && (
                    <button
                      onClick={() => navigate('/expert/edit')}
                      className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors flex items-center justify-between"
                    >
                      <span>전문가 정보 수정</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              </section>
            </div>
          </div>

          {/* 메인 콘텐츠 영역 */}
          <div className="md:w-2/3">
            {/* 전문가 포트폴리오 섹션 */}
            {userInfo?.role === 'EXPERT' && (
              <section className="bg-white border rounded-lg p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">포트폴리오</h2>
                  <button
                    onClick={() => navigate('/portfolio/edit')}
                    className="text-sm text-pink-600 hover:text-pink-700"
                  >
                    수정
                  </button>
                </div>
                {userInfo?.expertInfo?.portfolio ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userInfo.expertInfo.portfolio.map((item) => (
                      <div key={item.id} className="aspect-square bg-gray-100 rounded-lg p-4">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">등록된 포트폴리오가 없습니다.</p>
                )}
              </section>
            )}

            {/* 프로젝트 섹션 */}
            <section className="bg-white border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {userInfo?.role === 'EXPERT' ? '진행중인 프로젝트' : '의뢰한 프로젝트'}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {/* {userInfo?.projects.map((project) => (
                  <div key={project.id} className="border rounded-lg overflow-hidden">
                    <div className="p-4 border-l-4 border-l-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{project.title}</h3>
                        <span className={`px-2 py-1 text-sm rounded-full ${project.status === '진행중'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                          }`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500">
                            마감일: {project.deadline}
                          </span>
                        </div>
                        <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          상세보기
                        </button>
                      </div>
                    </div>
                  </div>
                ))} */}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* 휴대폰 인증 모달 */}
      {showVerificationModal && <PhoneVerificationModal />}
    </div>
  );
}

export default MyPage;
