import { useEffect,  useRef,  useState } from "react";
import "swiper/css";
import "./Main.css";
import MainSchedule from "../components/MainSchedule";
import MainFood from "../components/MainFood";
import MainPlace from "../components/MainPlace"; 
import MainLike from "../components/MainLike";

function Main({ foodData, placeData }) {
  const [activeTab, setActiveTab] = useState("sch");
  const mainWrapperRef = useRef(null);
  const id = sessionStorage.getItem("id");
  const userName = sessionStorage.getItem("userName");
  const userDescript = sessionStorage.getItem("userDescript");
  const img = sessionStorage.getItem("img");

  useEffect(() => {
    if (activeTab === "place" && mainWrapperRef.current) {
      mainWrapperRef.current.scrollTo({
        top: mainWrapperRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [activeTab]);

  return (
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
            <span className="do-hyeon-regular">{userDescript}</span>
          </div>
        </div>

        <div className="main-wrapper-bott">
          {/* 탭 네비게이션 */}
          <div className="category-navi">
            {["sch", "food", "dessert", "place", "bookmark"].map((tab) => (
              <div
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "sch"
                  ? "일정"
                  : tab === "food"
                  ? "맛집"
                  : tab === "dessert"
                  ? "디저트"
                  : tab === "place"
                  ? "가볼곳"
                  : "즐겨찾기"}
              </div>
            ))}
          </div>

          {/* 탭별 컨텐츠 */}
          <div className="main-content">
            {activeTab === "sch" && <MainSchedule />}

            {activeTab === "food" && (
              <MainFood id={id} category="food" foodData={foodData.food} />
            )}

            {activeTab === "dessert" && (
              <MainFood
                id={id}
                category="dessert"
                foodData={foodData.dessert}
              />
            )}

            {activeTab === "place" && (
              <MainPlace id={id} placeData={placeData} />
            )}

            {activeTab === "bookmark" && <MainLike id={id} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
