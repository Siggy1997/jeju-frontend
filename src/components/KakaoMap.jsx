
function KakaoMap({onClick, text}) {
    return (
        <MapMarker // 마커를 생성합니다
          position={{
            // 마커가 표시될 위치입니다
            lat: 33.40701,
            lng: 126.570667,
          }}
        />
    );
} 
export default KakaoMap;