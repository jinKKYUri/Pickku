
import Header from "../components/Header";
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { checkToken } from '../services/AuthService';

function MyPage() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUserInfo = async () => {
      const token = localStorage.getItem('token');
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
      } catch (error) {
        console.error("토큰 검증 실패:", error);
      }

    };

    getUserInfo();
  }, []);
  return (
    <>
      <Header />
      <div className="md:pt-[30px] xl:gap-[50px] mx-auto max-w-screen-xl w-full">
        <div className="flex flex-col items-start gap-x-[36px] md:flex-row md:px-[20px] xl:px-0">
          <section className="relative w-full pb-[16px] pt-0 lg:max-w-[389px] md:max-w-[305px] md:border md:border-gray-200 md:rounded-4px md:pt-[16px]">
            <h2 className="sr-only">유저 기본 정보</h2> 
            <div className="relative text-center mb-[30px] px-[16px] md:mb-0">
              <div className="-mt-14.5 md:mt-0">
                <div className="simple-profile-header flex flex-col both-center">
                  <div className="relative mt-[9px] h-[136px] w-[136px] flex both-center">
                  </div>
                  <div className="flex justify-center gap-1">
                    <div className="flex items-center justify-center gap-[5px] text-center text-lg font-bold">
                      <span>a</span>
                    </div>
                  </div>
                  <div className="text-center text-sm text-gray-500">{user?.nick}</div>
                </div></div></div>

            <div>
              <div className="pt-[35px] px-[0px] md:px-[16px]">
                <hr className="my-4 md:my-5" />
                <div className="px-[16px] md:px-0">
                  <div className="mb-[10px] w-fit text-zinc-600 font-medium">소개</div>
                  <div>
                    <div className="edit-content-box">
                      <div>
                        <div translate="yes" className="ProseMirror prose prose-zinc !max-w-none break-all tiptap">
                          <p>{user?.nick}(@{user?.id}) 커미션 </p>
                          <ul>
                            <li><p>마감일 꼭 지켜서 작업합니다!</p></li>
                            <li><p>최선을 다하겠습니다다☺️</p></li>
                          </ul></div></div></div></div></div></div></div>
          </section>
          <div className="w-full">
            <section className="w-full">
              <h2 className="sr-only">커미션 정보</h2>
              <div><hr className="border-gray-100 md:hidden" /></div>
              <section className="p-[20px] md:border md:rounded-4px">
                <div className="mt-4 flex flex-col gap-4">
                  <a className="group relative flex gap-3 break-all" href="/@mhe_com/21282">
                    <div className="h-full flex grow flex-col">
                      <div className="line-clamp-2 pr-5 text-sm font-bold sm:text-lg">LD 커미션</div>
                      <button className="bookmark-button group flex flex-none flex-col cursor-pointer items-center text-gray-600 absolute right-0 top-0.5">
                        <div className="flex both-center rounded-full transition">
                          <input id="toggle-bookmark" type="checkbox" className="cursor-pointer hidden" readOnly="" />
                            <label className=""><i className="transition cursor-pointer h-[18px] w-[18px] text-gray-400 i-cc-bookmark-line"></i></label>
                        </div></button>
                      <div className="mt-1 max-h-[3.6em] flex flex-wrap gap-2 overflow-hidden">
                        <span className="text-xs rounded-full px-2 py-1 text-gray-500 flex-none bg-gray-100">#그림</span>
                        <span className="text-xs rounded-full px-2 py-1 text-gray-500 flex-none bg-gray-100">#디자인</span>
                        <span className="text-xs rounded-full px-2 py-1 text-gray-500 flex-none bg-gray-100">#일러스트</span>
                        <span className="text-xs rounded-full px-2 py-1 text-gray-500 flex-none bg-gray-100">#버추얼</span>
                      </div>
                      <hr className="my-2 sm:my-3" /><p className="line-clamp-1 grow text-sm text-zinc-500">디자인부터 캐릭터 생성까지 ~ 커미션</p></div>
                  </a>

                </div>
              </section>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}


export default MyPage;