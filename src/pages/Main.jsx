import { useEffect,  useRef,  useState } from "react";
import "swiper/css";
import "./Main.css";
import MainSchedule from "../components/MainSchedule";
import MainFood from "../components/MainFood";
import MainPlace from "../components/MainPlace";
import MainBookMark from "../components/MainBookMark";

function Main() {
  const [activeTab, setActiveTab] = useState("sch");
  const mainWrapperRef = useRef(null);
  const id = sessionStorage.getItem("id");
  const userName = sessionStorage.getItem("userName");
  const img = sessionStorage.getItem("img");

  useEffect(() => {
    if (activeTab === "place" && mainWrapperRef.current) {
      // 렌더 후 스크롤
      mainWrapperRef.current.scrollTo({
        top: mainWrapperRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [activeTab]);

  return (
    <>
      <div className="main-wrapper" ref={mainWrapperRef}>
        <div
          className="main-wrapper-top"
          style={{ backgroundImage: `url(/images/airplane.jpeg)` }}
        ></div>

        <div className="main-wrapper-mid">
          <div
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              height: "9vh",
            }}
          >
            <div className="main-profile">
              <div
                className="profile-img-circle"
                style={{
                  backgroundImage: `URL(/images/profile_${img}.jpg)`,
                }}
              ></div>
            </div>

            <div className="main-profile-next">
              <span className="do-hyeon-regular">{userName}</span>
              <span className="do-hyeon-regular">안녕하세요!!</span>
            </div>
          </div>

          <div className="main-wrapper-bott">
            <div
              className="category-navi jua-regular"
              style={{ width: "100%" }}
            >
              <div
                className={activeTab === "sch" ? "active" : ""}
                onClick={() => setActiveTab("sch")}
              >
                일정
              </div>

              <div
                className={activeTab === "food" ? "active" : ""}
                onClick={() => setActiveTab("food")}
              >
                맛집
              </div>

              <div
                className={activeTab === "dessert" ? "active" : ""}
                onClick={() => setActiveTab("dessert")}
              >
                디저트
              </div>

              <div
                className={activeTab === "place" ? "active" : ""}
                onClick={() => setActiveTab("place")}
              >
                가볼곳
              </div>

              <div
                className={activeTab === "bookmark" ? "active" : ""}
                onClick={() => setActiveTab("bookmark")}
              >
                즐겨찾기
              </div>
            </div>

            <div className="main-content">
              {activeTab === "sch" && <MainSchedule />}
              {activeTab === "food" && <MainFood id={id} category={"food"}/>}
              {activeTab === "dessert" && <MainFood id={id}  category={"dessert"}/>}
              {activeTab === "place" && <MainPlace id={id}/>}
              {activeTab === "bookmark" && <MainBookMark id={id}/>}
            </div>
          
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
