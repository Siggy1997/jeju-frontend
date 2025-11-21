import { useEffect, useState} from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { getUserList } from "../apis/userAPI";
import { getMapList } from "../apis/mapAPI";
import ProfileCircle from "../components/ProfileCircle";
import "./MainMap.css";
import MapDetail from "../components/MapDetail";
import BottomSheet from "../components/BottomSheet"; // 수정된 BottomSheet import

const MainMap = () => {
  const markerFoodImageSrc = "/images/marker_food.png";
  const markerFoodSelectedImageSrc = "/images/marker_food_selected.png";
  const imageSize = { width: 30, height: 30 };
  const selectedImageSize = { width: 45, height: 45 };

  const [resData, setResData] = useState(null); // 지도용 데이터
  const [loginResData, setLoginResData] = useState(null); // 프로필용 데이터
  const [activeProfile, setActiveProfile] = useState([]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    item: null,
    center: { lat: 33.320701, lng: 126.570667 },
    isPanto: false,
  });

  // 프로필 클릭 시 active 토글
  const handleClick = (id) => {
    setActiveProfile((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const mapRes = await getMapList();
        console.log("지도 API Data:", mapRes);
        setResData(mapRes);
      } catch (error) {
        console.log("지도 API Error:", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const loginRes = await getUserList();
        console.log("프로필 API Data:", loginRes);
        setLoginResData(loginRes);
      } catch (error) {
        console.log("프로필 API Error:", error);
      }
    })();
  }, []);

  const getMapDetail = (item) => {
    if (item !== null) {
      setSelectedItem({
        item: item,
        center: { lat: item.lat - 0.02, lng: item.lng },
        isPanto: true,
      });
      setIsDetailOpen(true);
    } else {
      setSelectedItem({
        ...selectedItem,
        item: null,
      });
      setIsDetailOpen(false);
    }
  };

  return (
    <div className="main-map-wrapper">
      <Map
        center={selectedItem.center}
        isPanto={selectedItem.isPanto}
        style={{ maxWidth: "44rem", height: "100%" }}
        level={10}
      >
        {resData &&
          resData.result.map((item, index) => (
            <MapMarker
              key={index}
              clickable={true}
              onClick={() => getMapDetail(item)}
              position={{
                lat: item.lat,
                lng: item.lng,
              }}
              zIndex={
                selectedItem.item && selectedItem.item.seq === item.seq
                  ? 1000
                  : 1
              }
              image={{
                src:
                  selectedItem.item && selectedItem.item.seq === item.seq
                    ? markerFoodSelectedImageSrc // 클릭한 마커
                    : markerFoodImageSrc, // 기본 마커
                size:
                  selectedItem.item && selectedItem.item.seq === item.seq
                    ? selectedImageSize // 클릭한 마커 크기
                    : imageSize,
              }}
            />
          ))}
      </Map>

      <ProfileCircle
        loginResData={loginResData}
        handleClick={handleClick}
        activeProfile={activeProfile}
      />
      {/* BottomSheet 적용 부분 */}
      {isDetailOpen && selectedItem.item !== null ? (
        <MapDetail selectedItem={selectedItem} getMapDetail={getMapDetail} />
      ) : (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 900,
          }}
        >
          <BottomSheet>
          </BottomSheet>
        </div>
      )}
    </div>
  );
};

export default MainMap;
