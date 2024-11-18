import React, { useState } from 'react';
const LoginForm = () => {
  return (
    <div className="relative left-1/2 max-w-3xl w-full flex flex-col overflow-hidden md:mb-[60px] md:mt-[10px] md:flex-row md:rounded-3 -translate-x-1/2 border-0 sm:border-2 sm:rounded-lg sm:border-gray-250">
      <div className="relative z-20 grow rounded-t-[12px] bg-white px-[16px] py-[50px] md:rounded-0 md:px-[40px] ">
        <h2 className="mb-[38px] text-center text-xl font-semibold">로그인</h2>
        <form>
          <div className="space-y-[10px]">
            <div>
              <label className="text-sm font-semibold block sr-only" for="email">
                이메일 주소
                <span className="ml-1 inline-block text-red-500">
                  <span className="sr-only">필수 항목</span>
                </span>
              </label>
              <input id="email" className="block w-full h-[41px] rounded border bg-white px-4 py-2 ring-inset transition hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 disabled:bg-gray-50 disabled:text-gray-400 disabled:placeholder-gray-300 focus:ring-gray-500" type="text" name="email" placeholder="이메일 주소" />
            </div>
            <div>
              <label className="text-sm font-semibold block sr-only" for="password">
                비밀번호
                <span className="ml-1 inline-block text-red-500">* <span className="sr-only">필수 항목</span>
                </span>
              </label>
              <input id="password" className="block w-full h-[41px] rounded border bg-white px-4 py-2 ring-inset transition hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 disabled:bg-gray-50 disabled:text-gray-400 disabled:placeholder-gray-300 focus:ring-gray-500" type="password" name="password" placeholder="비밀번호" />
            </div>
          </div>
          <button className="items-center justify-center flex flex-none gap-2 rounded px-4 py-2 font-semibold transition duration-300 ease-out disabled:cursor-not-allowed text-white enabled:bg-brand-500 enabled:active:bg-brand-800 disabled:bg-gray-300 mt-[38px] h-[45px] w-full" disabled type="submit">로그인</button>
        </form>
        <div className="mt-[38px]">
          <h3 className="relative mb-[20px] text-center text-sm text-gray-500 before:absolute before:top-1/2 before:block before:w-full before:border-t before:content-empty before:-z-1">
            <span className="relative bg-white px-[12px] z-10">간편 로그인하기</span>
          </h3>
          <div className="flex justify-center gap-[25px]">
            <button className="h-[50px] w-[50px] flex both-center gap-2 border rounded-full text-sm font-semibold transition hover:border-gray-300">
              <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA4MTBfMjkg%2FMDAxNTAyMzQ1NjgxMTcx.HN5OduMJB4wLP2Ryov53lcBW-UhIkXLXZdd_SRReFAgg.mL_h394FDyN7gsATSeFOYSoDYWMPnuLPSfcLkquAIdMg.PNG.baroniter%2Fnaver_pay_img_04.png&type=a340" alt="Naver" class="h-[50px] w-[50px] rounded-full"/>
              <span className="sr-only">네이버 계정으로 로그인하기</span>
            </button>
            <button className="h-[50px] w-[50px] flex both-center gap-2 border rounded-full text-sm font-semibold transition hover:border-gray-300">
            <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20150902_266%2Fairishj01_1441151685011H1zoF_JPEG%2F11813434_10153577767937838_3231184993169792009_n.jpg&type=a340" alt="Naver" class="h-[50px] w-[50px] rounded-full"/>
              <span className="sr-only">구글 계정으로 로그인하기</span>
            </button>
          </div>
        </div>
        <button className="mx-auto mt-[20px] block text-center text-sm text-gray-700 space-x-[10px]">
          <span>계정이 없으신가요?</span>
          <span className="font-semibold underline">회원가입 하기</span>
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
