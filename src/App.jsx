import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainMap from "./pages/MainMap";
import Main from "./pages/Main";
import MusicPlayer from "./components/MusciPlayer";
import { getFoodList } from "./apis/foodAPI";

function App() {
  const id = sessionStorage.getItem("id");
  const [foodData, setFoodData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const foodResponse = await getFoodList(id, "food");
      setFoodData(foodResponse);

      // 이미지 미리 로드
      foodResponse.foodList.forEach(item => {
        [1, 2, 3, 4, 5].forEach(num => {
          const img = new Image();
          img.src = `/images/food/${item.seq}/pic${num}.jpeg`;
        });
      });

      setLoading(false);
    })();
  }, [id]);

  if (loading) return <div>로딩중...</div>;


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
