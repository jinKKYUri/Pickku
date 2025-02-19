import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import Navbar from "../components/Navbar";
import { checkToken } from "../services/AuthService";
import { jwtDecode } from "jwt-decode";

function MainPage() {
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
      {/* <Header type="main" user={user} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Category /> */}
      <Navbar user={user} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Slider />

    </div>
  );
}

export default MainPage;
