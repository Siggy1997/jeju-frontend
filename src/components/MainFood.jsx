import { useEffect, useState } from "react";
import { getFoodList} from "../apis/foodAPI";
import { toggleLike} from "../apis/userAPI";
import { motion } from "framer-motion";
import "./MainFood.css";

function MainFood({id, category}) {

  const [activeIndex, setActiveIndex] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [likeSeqList, setLikeSeqList] = useState([]);

  useEffect(() => {
    (async () => {
      const responseData = await getFoodList(id, category);
      console.log("음식 리스트:", responseData.foodList);
      setFoodList(responseData.foodList);
      setLikeSeqList(responseData.likeSeqList);
    })();
  }, [id, category]);
  
  const toggleFavorite = async (isFav, itemSeq) => {
    (async () => {
        await toggleLike(id, itemSeq, isFav, category);
    })();

    if (isFav) {
      setLikeSeqList((prev) => prev.filter((id) => id !== itemSeq));
    } else {
      setLikeSeqList((prev) => [...prev, itemSeq]);
    }
  };
  return (
    <div className="main-food-wrapper">
      {foodList &&
        foodList.map((item, index) => {
          const isFav = likeSeqList.includes(item.seq);

          return (
            <motion.div
              key={item.seq}
              className={`search-list ${activeIndex === index ? "active" : ""}`}
              animate={{ height: activeIndex === index ? 300 : 70 }}
              transition={{ duration: 0.3 }}
            >
              <div className="basic-info">
                <div
                  className="basic-info-first"
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="noto-sans-kr" style={{ fontSize: "1.2rem", display:"flex", alignItems:"center" }}>
                    {item.name}
                    <span style={{marginLeft:"8px", backgroundColor:"rgb(49 137 204 / 70%)", color:"white", borderRadius:"7px", padding:"1px 9px 2px 9px", fontSize:"0.8rem"}}>{item.type}</span>
                  </div>
                  <div
                    className="noto-sans-kr"
                    style={{ fontSize: "0.7rem", color: "#595959" }}
                  >
                    {item.descript}
                  </div>
                </div>

                <div
                  className="basic-info-second"
                  onClick={() => toggleFavorite(isFav, item.seq)}
                >
                  <div
                    className="favorite"
                    style={{
                      width: "35px",
                      backgroundImage: `url(/images/${
                        isFav ? "like.png" : "unlike.png"
                      })`,
                    }}
                  ></div>
                </div>
              </div>
              {activeIndex === index && (
                <>
                  <div className="split-gray"></div>
                  <div className="food-pic-wrapper">
                    
                    {[1, 2, 3, 4, 5].map((num) => (
                      <img
                        key={num}
                        src={`/images/food/${item.seq}/pic${num}.jpeg`}
                        alt={`pic-${num}`}
                      /> 
                    ))}
                    <div className="jua-regular"
                    onClick={() => window.location.href = `${item.naverMapUrl}`}
                    >
                      <img style={{width:"50%", height:"auto", margin:"10px 0"}} src="/images/arrow-right.png" />
                      더보기
                    </div>  
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
    </div>
  );
}

export default MainFood;
