import { useRef, useEffect, useState } from "react";
import song from "/audio/summer_baby.mp3";

function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // 페이지 로드 시 자동 재생
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((e) => {
        console.log("자동 재생 실패:", e);
        setIsPlaying(false);
      });
    }
  }, []);

  // 버튼 클릭 시 토글
  const handleToggle = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "13px",
        right: "10px",
        width: "30px",
        height: "30px",
        backgroundColor: "#0303032b",
        display: "flex",
        justifyContent:"center",
        alignContent:"center",
        borderRadius: "50%",
        flexWrap:"wrap"
      }}
    >
      <audio ref={audioRef} src={song} loop />

      <button
        onClick={handleToggle}
        style={{
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          padding: "11px", 
          backgroundImage: `url(${
            isPlaying ? "/images/volume.png" : "/images/volume-no.png"
          })`,
          backgroundSize: "cover",
          zIndex:"999",
          backgroundColor:"#ffffff8f" 
        }}
      />
    </div>
  );
}

export default MusicPlayer;
