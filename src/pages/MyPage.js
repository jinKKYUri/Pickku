import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { checkToken } from "../services/AuthService";

function MyPage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("토큰이 없습니다. 로그아웃 상태로 설정합니다.");
        return;
      }
      try {
        await checkToken(token);
        const userInfo = jwtDecode(token);
        setUser(userInfo);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("토큰 검증 실패:", error);
      }
    };

    getUserInfo();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* 프로필 섹션 */}
        <section className="bg-background border rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 rounded-lg bg-gray-200 flex items-center justify-center">
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="프로필"
                  className="w-full h-full rounded-lg object-cover"
                />
              ) : (
                <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{user?.nickname || user?.name || "사용자"}</h1>
              <p className="text-muted-foreground">{user?.email || "이메일"}</p>
            </div>
          </div>
        </section>

        {/* 내 프로젝트 섹션 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">내 프로젝트</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((project) => (
              <div key={project} className="card">
                <div className="aspect-video rounded-t-lg bg-muted" />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">프로젝트 제목</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    진행 상태: 진행중
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      마감일: 2024.03.31
                    </span>
                    <button className="btn btn-outline">상세보기</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 계정 설정 섹션 */}
        <section>
          <h2 className="text-xl font-semibold mb-4">계정 설정</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <div>
                <h3 className="font-medium">프로필 수정</h3>
                <p className="text-sm text-muted-foreground">
                  프로필 사진과 기본 정보를 수정합니다
                </p>
              </div>
              <button
                onClick={() => navigate('/profileEdit')}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                수정
              </button>
            </div>
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <div>
                <h3 className="font-medium">비밀번호 변경</h3>
                <p className="text-sm text-muted-foreground">
                  계정 보안을 위해 비밀번호를 변경합니다
                </p>
              </div>
              <button className="btn btn-ghost">변경</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyPage;
