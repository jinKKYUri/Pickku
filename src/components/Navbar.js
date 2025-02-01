import Header from "./Header";
import Category from "./Category";
import { useEffect, useState } from "react";
import { checkToken } from "../services/AuthService";
import { jwtDecode } from "jwt-decode";
import OffcanvasExample from "./OffcanvasExample";
import AlignmentExample from "./AlignmentExample";

function Navbar() {
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
        localStorage.removeItem("token");
      }
    };

    getUserInfo();
  }, []);
  return (
    <>
      {/* <Header
        type="main"
        user={user}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      /> */}
      <OffcanvasExample/>
      <Category />
      {/* <AlignmentExample/> */}
    </>
  );
}

export default Navbar;
