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
      <section>
        <h2 className="text-2xl font-semibold mb-6">최근 작업물</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
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
    </div>
  );
}

export default Home;
