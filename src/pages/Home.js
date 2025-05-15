import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 메인 배너 섹션 */}
      <section className="mb-12">
        <div className="bg-primary rounded-lg p-8 text-white">
          <h1 className="text-4xl font-bold mb-4">
            당신의 디자인 프로젝트를 시작하세요
          </h1>
          <p className="text-lg mb-6">
            전문 디자이너들과 함께 아이디어를 현실로 만들어보세요
          </p>
          <Link
            to="/request"
            className="inline-block bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors"
          >
            프로젝트 시작하기
          </Link>
        </div>
      </section>

      {/* 신뢰도 섹션 */}
      <section className="mb-12 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-8 text-center">왜 Pickku를 선택하시나요?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">검증된 전문가</h3>
            <p className="text-gray-600">엄격한 포트폴리오 심사를 통과한 실력있는 디자이너</p>
          </div>
          <div className="text-center">
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">안전한 거래</h3>
            <p className="text-gray-600">에스크로 시스템을 통한 안전한 대금 보호</p>
          </div>
          <div className="text-center">
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">빠른 진행</h3>
            <p className="text-gray-600">평균 1-3일 내 작업물 전달</p>
          </div>
        </div>
      </section>

      {/* 카테고리 섹션 */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">인기 카테고리</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/category/character"
            className="group relative overflow-hidden rounded-lg aspect-video"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
              캐릭터 일러스트
            </h3>
          </Link>
          <Link
            to="/category/illustration"
            className="group relative overflow-hidden rounded-lg aspect-video"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
              일러스트
            </h3>
          </Link>
          <Link
            to="/category/3d"
            className="group relative overflow-hidden rounded-lg aspect-video"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
              3D 모델링
            </h3>
          </Link>
        </div>
      </section>

      {/* 최근 작업물 섹션 */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">최근 작업물</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item) => (
            <div key={item} className="card">
              <div className="aspect-square rounded-t-lg bg-muted" />
              <div className="p-4">
                <h3 className="font-semibold mb-2">프로젝트 제목</h3>
                <p className="text-sm text-muted-foreground">
                  디자이너 이름
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 고객 후기 섹션 */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">고객 후기</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              content: "원하는 디자인을 정확하게 구현해주셔서 매우 만족스러웠습니다. 소통도 원활했고 수정사항도 빠르게 반영해주셨어요!",
              author: "김OO",
              rating: 5,
              project: "캐릭터 디자인"
            },
            {
              content: "전문적인 조언을 해주시면서 작업을 진행해주셔서 결과물이 기대 이상이었습니다. 다음에도 꼭 의뢰하고 싶어요.",
              author: "이OO",
              rating: 5,
              project: "일러스트레이션"
            },
            {
              content: "빠른 작업 속도와 퀄리티 모두 만족스러웠습니다. 추천합니다!",
              author: "박OO",
              rating: 5,
              project: "3D 모델링"
            }
          ].map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">{review.content}</p>
              <div className="text-sm text-gray-500">
                <p className="font-semibold">{review.author}</p>
                <p>{review.project}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
