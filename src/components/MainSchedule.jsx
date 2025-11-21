import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "./MainSchedule.css"

function MainSchedule() {
  return (
      <Swiper
        modules={[Autoplay]}
        style={{ height: "70%" }}
        spaceBetween={8}
        slidesPerView={2.2}
        slidesOffsetBefore={10}
        slidesOffsetAfter={10}
        autoplay={{
          delay: 4500, 
          disableOnInteraction: false, 
        }}
        speed={600}
      >
        <SwiperSlide
          className="main-swiper-slide"
          style={{ backgroundImage: `url(/images/pic1.jpg)` }}
          onClick={() => (alert("comming soon"))}
          >
          <div
            className="open-sans-bold"
            style={{ padding: "0 16px 6px 0", boxSizing: "border-box" }}
            >
            DAY 1
          </div>
        </SwiperSlide>

        <SwiperSlide
          className="main-swiper-slide"
          style={{ backgroundImage: `url(/images/pic2.jpg)` }}
          onClick={() => (alert("comming soon"))}
          >
          <div
            className="open-sans-bold"
            style={{ padding: "0 16px 6px 0", boxSizing: "border-box" }}
            >
            DAY 2
          </div>
        </SwiperSlide>

        <SwiperSlide
          className="main-swiper-slide"
          style={{ backgroundImage: `url(/images/pic3.jpg)` }}
          onClick={() => (alert("comming soon"))}
        >
          <div
            className="open-sans-bold"
            style={{ padding: "0 16px 6px 0", boxSizing: "border-box" }}
          >
            DAY 3
          </div>
        </SwiperSlide>
      </Swiper>
  );
}

export default MainSchedule;
