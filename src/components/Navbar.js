import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { checkToken } from "../services/AuthService";

const categories = [
  { name: "캐릭터 일러스트", path: "/category/character" },
  { name: "일러스트", path: "/category/illustration" },
  { name: "버추어 3D", path: "/category/3d" },
  { name: "영상", path: "/category/video" },
  { name: "음향", path: "/category/audio" },
];

const mainMenu = [
  { name: "디자인 요청", path: "/request" },
  { name: "고객 후기", path: "/reviews" },
];

function SearchModal({ isOpen, onClose, searchQuery, setSearchQuery }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="flex flex-col h-full">
        {/* 모달 헤더 */}
        <div className="flex items-center p-4 border-b border-border">
          <button
            onClick={onClose}
            className="mr-3 text-muted-foreground"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input w-full pr-10"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* 검색 결과 */}
        <div className="flex-1 overflow-y-auto p-4">
          {searchQuery ? (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">검색 결과</h3>
              {/* TODO: 검색 결과 표시 */}
              <p className="text-center text-muted-foreground py-8">
                검색 결과가 없습니다.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* 최근 검색어 */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">최근 검색어</h3>
                <div className="flex flex-wrap gap-2">
                  {['일러스트', '캐릭터', '3D 모델링'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1.5 rounded-full bg-muted text-sm font-medium text-foreground hover:bg-primary/10"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* 인기 검색어 */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">인기 검색어</h3>
                <div className="space-y-2">
                  {['캐릭터 디자인', '로고 디자인', '일러스트레이션', '3D 캐릭터'].map((term, index) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="flex items-center w-full px-3 py-2 rounded-md hover:bg-muted"
                    >
                      <span className="w-6 text-primary font-semibold">{index + 1}</span>
                      <span className="flex-1 text-foreground">{term}</span>
                      <span className="text-sm text-muted-foreground">급상승</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage에서 사용자 정보 확인
    const userInfo = localStorage.getItem('userInfo');
    const token = localStorage.getItem('token');

    if (userInfo && token) {
      setUser(JSON.parse(userInfo));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    setUser(null);
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleSearchClick = () => {
    // 모바일에서만 모달 열기
    if (window.innerWidth < 768) {
      setIsSearchModalOpen(true);
    }
  };

  return (
    <div className="sticky top-0 z-50">
      {/* 상단 네비게이션 */}
      <nav className="bg-background">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* 로고 및 모바일 메뉴 버튼 */}
            <div className="flex items-center gap-4">
              {/* 모바일 메뉴 버튼 */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden btn-ghost p-2"
              >
                <span className="sr-only">메뉴 열기</span>
                {!isMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
              {/* 로고 */}
              <Link to="/" className="text-2xl font-extrabold text-foreground">
                Pickku
              </Link>
            </div>

            {/* 검색 */}
            <div className="flex-1 max-w-xl mx-4 hidden md:block">
              <div className="relative">
                {/* 데스크톱 검색창 */}
                <input
                  type="text"
                  placeholder="검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={handleSearchClick}
                  className="input w-full font-medium"
                />
                {/* 데스크톱 검색 버튼 */}
                <button className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 데스크톱 로그인/회원가입 버튼 */}
            <div className="hidden md:flex items-center gap-4">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    onBlur={() => setTimeout(() => setIsProfileDropdownOpen(false), 100)}
                    className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center">
                      {user?.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt="프로필"
                          className="w-full h-full rounded-lg object-cover"
                        />
                      ) : (
                        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user?.nickname || 'test'}</span>
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-50">
                      <Link
                        to={`/mypage/${user?.id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        마이페이지
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        주문관리
                      </Link>
                      <hr className="my-1 border-gray-200" />
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsProfileDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        로그아웃
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center px-6 py-2 text-base font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    로그인
                  </Link>
                  <Link
                    to="/signUp"
                    className="inline-flex items-center justify-center px-6 py-2 text-base font-semibold text-white bg-primary hover:bg-primary-hover transition-colors rounded-lg"
                  >
                    회원가입
                  </Link>
                </>
              )}
            </div>

            {/* 모바일 검색 버튼 */}
            <button
              onClick={handleSearchClick}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* 모바일 메뉴 - 2단 */}
          <div className="md:hidden">
            <div className="flex items-center justify-between h-6">
              {/* 메인 메뉴 */}
              <div className="flex items-center gap-4">
                <Link
                  to="/categories"
                  className="text-base font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  카테고리
                </Link>
                {mainMenu.map((menu) => (
                  <Link
                    key={menu.path}
                    to={menu.path}
                    className="text-base font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {menu.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 하단 메뉴 */}
      <nav className="bg-background border-b border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex h-10 md:h-12 items-center">
            {/* 데스크톱 메뉴 */}
            <div className="hidden md:flex items-center gap-6">
              {/* 카테고리 드롭다운 */}
              <div className="relative flex items-center">
                <button
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  onBlur={() => setTimeout(() => setIsCategoryDropdownOpen(false), 100)}
                  className="text-base font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center"
                >
                  카테고리
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isCategoryDropdownOpen && (
                  <div className="absolute top-full left-0 w-48 py-2 mt-1 bg-background rounded-md shadow-lg border border-border z-40">
                    {categories.map((category) => (
                      <Link
                        key={category.path}
                        to={category.path}
                        className="block px-4 py-2 text-base text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {/* 기타 메인 메뉴 */}
              {mainMenu.map((menu) => (
                <Link
                  key={menu.path}
                  to={menu.path}
                  className="text-base font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center"
                >
                  {menu.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
          <div className="absolute inset-y-0 left-0 w-64 bg-background border-r border-border shadow-xl">
            <div className="flex flex-col h-full">
              {/* 모바일 메뉴 헤더 */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="text-lg font-semibold">메뉴</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-ghost p-2"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* 모바일 메뉴 본문 */}
              <div className="flex-1 overflow-y-auto">
                {/* 로그인/회원가입 */}
                <div className="p-4 border-b border-border">
                  {isLoggedIn ? (
                    <>
                      <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                          {user?.profileImage ? (
                            <img
                              src={user.profileImage}
                              alt="프로필"
                              className="w-full h-full rounded-lg object-cover"
                            />
                          ) : (
                            <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="text-base font-medium text-gray-700">{user?.nickname || 'test'}</span>
                      </div>
                      <Link
                        to={`/mypage/${user?.id}`}
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        마이페이지
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        주문관리
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        로그아웃
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-3 py-2 rounded-md text-base font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        로그인
                      </Link>
                      <Link
                        to="/signUp"
                        className="block px-3 py-2 rounded-md text-base font-semibold text-white bg-primary hover:bg-primary-hover transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        회원가입
                      </Link>
                    </>
                  )}
                </div>

                {/* 카테고리 */}
                <div className="p-4">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">카테고리</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category.path}
                        to={category.path}
                        className="block px-3 py-2 rounded-md text-base font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 검색 모달 */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
}

export default Navbar;
