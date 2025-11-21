import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainMap from "./pages/MainMap";
import Main from "./pages/Main";
import MusicPlayer from "./components/MusciPlayer";
import { getPlaceList } from "./apis/placeAPI";
import { getFoodList } from "./apis/foodAPI";

function App() {
  const id = sessionStorage.getItem("id");
  const [loading, setLoading] = useState(true);
  const [foodData, setFoodData] = useState({ food: [], dessert: [] });
  const [placeData, setPlaceData] = useState([]);

  useEffect(() => {
    if (!id) return;

    (async () => {
      setLoading(true);
      console.log("preload 시작")

      // 음식 / 디저트 API 호출
      const foodResponse = await getFoodList(id, "food");
      const dessertResponse = await getFoodList(id, "dessert");

      setFoodData({ food: foodResponse, dessert: dessertResponse });

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

      // 비디오 preload (첫 화면용)
      (placeResponse.placeList || []).forEach((item) => {
        const video = document.createElement("video");
        video.src = `/videos/place/${item.seq}.mp4`;
        video.preload = "auto";
      });

      setLoading(false);
    })();
  }, [id]);

  if (loading && id) return <div>로딩중...</div>;
  return (
    <>
      <MusicPlayer />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/map" element={<MainMap />}></Route>
      </Routes>
    </>
  );
}

export default App;
