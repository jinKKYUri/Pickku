import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "../styles/Banner.css";

// 이미지 데이터와 링크 정보를 배열로 생성
const slides = [
  {
    imageUrl:
      "https://artmugfile2.cafe24.com/image/goods_img1/1/17056C.jpg?ver=1717445691",
  },
  {
    imageUrl:
      "https://www.live2d.com/wp-content/themes/cubism_new/assets/img/cubism/cubism-about_01.jpg",
  },
  {
    imageUrl:
      "https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/2NYC/image/KZlDlqSPUlHMXmDO6UjsI9XcInk.jpg",
  },
  {
    imageUrl:
      "https://artmugfile2.cafe24.com/image/goods_img1/1/19632B.jpg?ver=1729976301",
  },
  {
    imageUrl:
      "https://cdn.class101.net/images/8b7eb3d7-0688-4019-a19c-92fcb5c2170c",
  },
  {
    imageUrl:
      "https://artmugfile2.cafe24.com/image/goods_img1/1/17056C.jpg?ver=1717445691",
  },
  {
    imageUrl:
      "https://artmugfile2.cafe24.com/image/goods_img1/2/28890C.jpg?ver=1728958552",
  },
];

function Banner() {
  const [current, setCurrent] = useState(1);
  const total = slides.length;

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    duration: 2000, // 슬라이드 이동 애니메이션 시간
    slides: {
      perView: 3, // 한 번에 3개의 슬라이드 표시
      spacing: 15, // 슬라이드 간의 간격
    },
    centered: true, // 슬라이드 중앙 맞춤
    drag: false, // 드래그 비활성화
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
      //setCurrent(instanceRef.current.track.details.rel + 1);
      setCurrent((prevCurrent) => {
        const newCurrent = prevCurrent + 1;
        if (newCurrent > total) return 1;
        return newCurrent;
      });
    }, 5000);
    return () => clearInterval(interval); // 컴포넌트가 언마운트되면 인터벌(반복작업)을 제거
  }, [instanceRef, total]);

  const goToPrevSlide = () => {
    instanceRef.current?.prev();
    setCurrent((prevCurrent) => (prevCurrent === 1 ? total : prevCurrent - 1));
  };

  const goToNextSlide = () => {
    instanceRef.current?.next();
    setCurrent((nextCurrent) => (nextCurrent === total ? 1 : nextCurrent + 1));
  };

  return (
    <div className="banner">
      <ul ref={sliderRef} className="keen-slider">
        {slides.map((slide, index) => (
          <li key={index} className={`keen-slider__slide slide-${index}`}>
            <a href={slide.href}>
              <img
                alt={slide.alt}
                src={slide.imageUrl}
                loading="lazy"
                className="slide-image"
              />
            </a>
          </li>
        ))}
      </ul>

      <div className="slider-center">
        <div className="slider-arrow-left">
          <button className="slider-button"  onClick={goToPrevSlide}>
            <span role="img" className="arrow-icon">
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
              >
                <path
                  clipRule="evenodd"
                  d="M16.2071 19.7071C16.5976 19.3166 16.5976 18.6834 16.2071 18.2929L9.91421 12L16.2071 5.70711C16.5976 5.31658 16.5976 4.68342 16.2071 4.29289C15.8166 3.90237 15.1834 3.90237 14.7929 4.29289L7.79289 11.2929C7.40237 11.6834 7.40237 12.3166 7.79289 12.7071L14.7929 19.7071C15.1834 20.0976 15.8166 20.0976 16.2071 19.7071Z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </span>
          </button>
        </div>

        <div className="slider-arrow-right">
          <button className="slider-button" onClick={goToNextSlide}>
            <span role="img" className="arrow-icon" >
              <svg
                aria-hidden="true"
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  clipRule="evenodd"
                  d="M7.79289 19.7071C7.40237 19.3166 7.40237 18.6834 7.79289 18.2929L14.0858 12L7.79289 5.70711C7.40237 5.31658 7.40237 4.68342 7.79289 4.29289C8.18342 3.90237 8.81658 3.90237 9.20711 4.29289L16.2071 11.2929C16.5976 11.6834 16.5976 12.3166 16.2071 12.7071L9.20711 19.7071C8.81658 20.0976 8.18342 20.0976 7.79289 19.7071Z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </span>
          </button>
        </div>

        <div className="slider-counter">
          <span className="current-slide">{current}</span>
          <span className="separator">/</span>
          <span className="total-slides">{total}</span>
        </div>
      </div>
    </div>
  );
}


export default Banner;
