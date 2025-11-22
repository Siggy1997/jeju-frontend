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
