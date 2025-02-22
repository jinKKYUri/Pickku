import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getNaverAccessToken } from "../services/NaverLoginService";

function NaverCallback() {

    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const stateFromQuery = urlParams.get("state");
        const state = localStorage.getItem("naver_state");
        localStorage.removeItem("naver_state");
        if (stateFromQuery === state) {
            getNaverAccessToken(code)
                .then(response => {
                    if (response.data.success) {

                        //일단 그냥 로컬스토리지에 저장해둠
                        const updatedUser = {
                            ...response.data.user,
                            provider: "NAVER"
                        };
                        localStorage.setItem("user", JSON.stringify(updatedUser));
                        localStorage.setItem("token", response.data.accessToken);
                        // localStorage.setItem("expiresAt", Date.now() + response.data.expiresIn * 1000);
                       window.close();

                    } else {
                        console.error(response.data.error_description);
                        setTimeout(() => {
                            window.close();
                        }, 1000);
                    }
                })
                .catch(error => {
                    console.error('서버 오류', error);
                });
        } else {
            console.error("state 값 불일치. 인증을 진행할 수 없습니다.");
            navigate("/login");
        }
    }, []);

    return null;
}
export default NaverCallback;
