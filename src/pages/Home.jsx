import {useEffect, useState } from "react";
import TransBox from "../components/TransBox";
import AnimateButtonOne from "../components/AnimateButtonOne";
import SwiperCard from "../components/SwiperCard";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { getUserList } from "../apis/userAPI";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [resData, setResData] = useState();
  const [mainStart, setMainStart] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    sessionStorage.setItem("id", resData.result[activeIndex].id);
    sessionStorage.setItem("userName", resData.result[activeIndex].userName);
    sessionStorage.setItem("img", resData.result[activeIndex].img);

    navigate("/main");
  };

  useEffect(() => {
    (async () => {
        const response = await getUserList();
        console.log("API Data:", response);
        setResData(response);
    })();
  }, []);

  return (
    <div className="home-wrapper max-42 relative">
      <video
        src="/videos/ocean.mp4"
        className="background-video"
        autoPlay
        muted
        loop
        playsInline
        style={{ width: "100%", height: "100%", top: "0" }}
      ></video>

      <div
        className="login-top momo-trust-display-regular"
        style={{ zIndex: "1" }}
      >
        JEJU
      </div>
      <div className="login-mid open-sans-bold">
        {mainStart === false ? (
          <>
            <div className="count-down-wrapper open-sans-bold">
              <TransBox type={"day"} classInfo={"countDown"} />
              <div className="colon"> : </div>
              <TransBox type={"hour"} classInfo={"countDown"} />
              <div className="colon"> : </div>
              <TransBox type={"minute"} classInfo={"countDown"} />
              <div className="colon"> : </div>
              <TransBox type={"second"} classInfo={"countDown"} />
            </div>
          </>
        ) : (
          <div className="swiper-card-wrapper open-sans-bold">
            <SwiperCard
              resData={resData}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          </div>
        )}
      </div>
      <div className="login-bott">
        {mainStart === false ? (
          <AnimateButtonOne
            onClick={() => setMainStart(true)}
            text={"시작하기"}
          />
        ) : (
          <AnimateButtonOne onClick={handleLogin} text={"선택"} />
        )}
      </div>
    </div>
  );
}
