import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import "./MainPlace.css";
import { getPlaceList } from "../apis/placeAPI";
import { toggleLike } from "../apis/userAPI";

function MainPlace({ id }) {
  const videoRefs = useRef([]); // refs 초기화 제거, 렌더 간 유지
  const addVideoRef = (el) => {
    if (el && !videoRefs.current.includes(el)) {
      videoRefs.current.push(el);
    }
  };

  const [placeList, setPlaceList] = useState([]);
  const [likeSeqList, setLikeSeqList] = useState([]);

  // placeList 가져오기
  useEffect(() => {
    (async () => {
      const responseData = await getPlaceList(id);
      setPlaceList(responseData.placeList || []);
      setLikeSeqList(responseData.likeSeqList || []);
    })();
  }, [id]);

  // 첫 영상 자동재생 (refs 준비 후)
  useEffect(() => {
    if (videoRefs.current.length > 0) {
      const firstVideo = videoRefs.current[0];
      firstVideo.play().catch(() => {});
    }
  }, [placeList]);

  // 좋아요 토글
  const toggleFavorite = async (isFav, itemSeq) => {
    await toggleLike(id, itemSeq, isFav, "place");
    if (isFav) {
      setLikeSeqList((prev) => prev.filter((seq) => seq !== itemSeq));
    } else {
      setLikeSeqList((prev) => [...prev, itemSeq]);
    }
  };

  return (
    <div className="place-wrapper">
      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        style={{ width: "95%", height: "84vh" }}
        onSlideChange={(swiper) => {
          const activeIndex = swiper.activeIndex;
          videoRefs.current.forEach((video, idx) => {
            if (!video) return;
            if (idx === activeIndex) {
              video.play().catch(() => {});
            } else {
              video.pause();
              video.currentTime = 0;
            }
          });
        }}
      >
        {placeList.map((item) => {
          const isFav = likeSeqList.includes(item.seq);
          return (
            <>
              <SwiperSlide
                key={`video-${item.seq}`}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="favorite"
                  onClick={() => toggleFavorite(isFav, item.seq)}
                  style={{
                    position: "absolute",
                    top: "2%",
                    width: "42px",
                    height: "42px",  
                    backgroundImage: `url(/images/${
                      isFav ? "like.png" : "unlike.png"
                    })`,
                    backgroundSize: "cover",
                    zIndex: 10,
                  }}
                />
                {/* 비디오 */}
                <video
                  ref={addVideoRef}
                  src={`/videos/place/${item.seq}.mp4`}
                  playsInline
                  webkit-playsinline
                  loop
                  preload="auto"
                  style={{
                    height: "100%",
                    borderRadius: "10px",
                    objectFit: "contain",
                    background: "rgb(245 245 245)",
                  }}
                ></video>
                <div
                  className="jua-regular"
                  style={{
                    position: "absolute",
                    fontSize: "2.3rem",
                    width: "100%",
                    bottom: "8%",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  {item.name}
                </div>
              </SwiperSlide>
            </>
          );
        })}
      </Swiper>

      {/* 슬라이드 드래그 표시 (선택사항) */}
      <div className="video-slide" style={{ height: "3vh" }}></div>
    </div>
  );
}

export default MainPlace;
