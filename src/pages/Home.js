import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import { jwtDecode } from "jwt-decode";
import { checkToken } from "../services/AuthService";

function Home() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("토큰이 없습니다. 로그아웃 상태로 설정합니다.");
        return;
      }
      try {
        //response - 토큰 검증 확인용 메시지지
        const response = await checkToken(token);

        // 토큰에서 사용자 정보 디코딩
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
    <div>
      <Header type="main" user={user} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {/* <Category />
      <Navbar /> */}
      <div className="main-content" style={{paddingTop:`calc(120px + 10px)`}}>
        <Banner />
        <div className="recommand-art">
          추천 창작물<br/>
          추천 작가<br/>
          작품 의뢰 방법<br/>
        </div>
        {/* <IndividualIntervalsExample/> */}
      </div>

    </div>
  );
}

export default Home;
