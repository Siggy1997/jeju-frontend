import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade } from "swiper/modules";
import "./SwiperCard.css";
import { useState } from "react";

function SwiperCard({ resData, activeIndex, setActiveIndex }) {


  return (
    <>
      <Swiper
        spaceBetween={30}
        slidesPerView={2.1}
        centeredSlides={true}
        loop={false}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {resData &&
          resData.result.map((item, index) => (
            <>
              <SwiperSlide
                key={index}
                style={{
                  backgroundImage: `URL(/images/profile_${item.img}.jpg)`,
                  backgroundSize: "cover",
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                }}
              ></SwiperSlide>
            </>
          ))}
      </Swiper>

      <div
        className="momo-trust-display-regular"
        style={{
          position: "relative", // 부모 기준 위치 지정
          top: "100%", // Swiper 바로 아래
          left: "50%", // 가로 가운데
          transform: "translateX(-50%)", // 자기 너비 기준 중앙 정렬
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white",
          fontSize: "1.2rem",
          fontWeight: "700",
          padding: "4px 8px",
          borderRadius: "12px",
          width: "22%",
          marginTop: "15px",
          textAlign: "center",
        }}
      >
        {resData?.result[activeIndex]?.userName}
      </div>
    </>
  );
}

export default SwiperCard;
