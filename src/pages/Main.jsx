import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "./Main.css";
import MainSchedule from "../components/MainSchedule";
import MainFood from "../components/MainFood";
import MainPlace from "../components/MainPlace";
import MainLike from "../components/MainLike";
import { getFoodList } from "../apis/foodAPI";
import { getPlaceList } from "../apis/placeAPI";
import Loading from "../components/Loading";

function Main() {
  const [activeTab, setActiveTab] = useState("sch");
  const mainWrapperRef = useRef(null);

  const id = sessionStorage.getItem("id");
  const userName = sessionStorage.getItem("userName");
  const userDescript = sessionStorage.getItem("userDescript");
  const img = sessionStorage.getItem("img");

  const [loading, setLoading] = useState(true);
  const [foodData, setFoodData] = useState({
    food: [],
    foodLike: [],
    dessert: [],
    dessertLike: [],
  });
  const [placeData, setPlaceData] = useState([]);
  const [isReady, setIsReady] = useState(false);

  // 데이터와 preload
  useEffect(() => {
    console.log("preLoad 시작?");
    if (!id) return; // 내부에서 조건 처리

    (async () => {
      setLoading(true);
      console.log("preLoad ㅇㅇ");

      // 음식 / 디저트 API 호출
      const foodResponse = await getFoodList(id, "food");
      const dessertResponse = await getFoodList(id, "dessert");
      setFoodData({
        food: foodResponse.foodList,
        foodLike: foodResponse.likeSeqList,
        dessert: dessertResponse.foodList,
        dessertLike: dessertResponse.likeSeqList,
      });

      // 장소 API 호출
      const placeResponse = await getPlaceList(id);
      setPlaceData(placeResponse.placeList || []);

      // 이미지 preload
      [foodResponse, dessertResponse].forEach((resp) => {
        resp.foodList.forEach((item) => {
          [1, 2, 3, 4, 5].forEach((num) => {
            const img = new Image();
            img.src = `/images/food/${item.seq}/pic${num}.jpeg`;
          });
        });
      });

      // 비디오 preload
      (placeResponse.placeList || []).forEach((item) => {
        const video = document.createElement("video");
        video.src = `/videos/place/${item.seq}.mp4`;
        video.preload = "auto";
      });

      console.log("preLoad 완료");
      console.log(foodData);
      setLoading(false);
    })();
  }, [id]);

  // place 탭에서 자동 스크롤
  useEffect(() => {
    if (activeTab === "place" && mainWrapperRef.current) {
      mainWrapperRef.current.scrollTo({
        top: mainWrapperRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [activeTab]);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (!isReady) return <Loading />;

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
              <span className="do-hyeon-regular">{userDescript}</span>
            </div>
          </div>

          <div className="main-wrapper-bott">
            <div
              className="category-navi jua-regular"
              style={{ width: "100%" }}
            >
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

            <div className="main-content">
              {activeTab === "sch" && <MainSchedule />}
              {activeTab === "food" && (
                <MainFood
                  id={id}
                  foodList={foodData.food}
                  category={"food"}
                  likeSeqList={foodData.foodLike}
                />
              )}
              {activeTab === "dessert" && (
                <MainFood
                  id={id}
                  foodList={foodData.dessert}
                  category={"dessert"}
                  likeSeqList={foodData.dessertLike}
                />
              )}
              {activeTab === "place" && (
                <MainPlace id={id} placeList={placeData} />
              )}
              {activeTab === "bookmark" && <MainLike id={id} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
