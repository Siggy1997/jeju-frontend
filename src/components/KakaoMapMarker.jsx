import { MapMarker } from "react-kakao-maps-sdk";

function KakaoMapMarker({ resData }) {
    const markerImageSrc = "/images/marker_food.png";
    const imageSize = { width: 27, height: 27 }

  return (
    <>
      {resData &&
        resData.result.map((item, index) => (
          <MapMarker
            key={index}
            position={{
              lat: item.lat, // item에 위도, 경도 값이 있다면 이렇게
              lng: item.lng,
            }}
            image={{
              src: markerImageSrc,
              size: imageSize,
            }}
          />
          // <MapMarker
          //   key={index}
          //   position={{
          //     lat: item.lat, // item에 위도, 경도 값이 있다면 이렇게
          //     lng: item.lng,
          //   }}
          // />
        ))}
    </>
  );
}

export default KakaoMapMarker;
