import { useState } from "react";
import { motion } from "framer-motion";
import { toggleLike } from "../apis/userAPI";

function MainFood({ id, category, foodData }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [likeSeqList, setLikeSeqList] = useState(foodData.likeSeqList || []);

  const toggleFavorite = async (isFav, itemSeq) => {
    await toggleLike(id, itemSeq, isFav, "food");
    setLikeSeqList(prev =>
      isFav ? prev.filter(seq => seq !== itemSeq) : [...prev, itemSeq]
    );
  };

  return (
    <div className="main-food-wrapper">
      {foodData.foodList.map((item, index) => {
        const isFav = likeSeqList.includes(item.seq);

        return (
          <motion.div
            key={item.seq}
            className={`search-list ${activeIndex === index ? "active" : ""}`}
            animate={{ height: activeIndex === index ? 300 : 70 }}
            transition={{ duration: 0.3 }}
          >
            <div className="basic-info">
              <div onClick={() => setActiveIndex(index)}>
                {item.name} <span>{item.type}</span>
                <div>{item.descript}</div>
              </div>

              <div onClick={() => toggleFavorite(isFav, item.seq)}>
                <div
                  className="favorite"
                  style={{
                    backgroundImage: `url(/images/${isFav ? "like.png" : "unlike.png"})`
                  }}
                />
              </div>
            </div>

            {activeIndex === index && (
              <div className="food-pic-wrapper">
                {[1, 2, 3, 4, 5].map(num => (
                  <img
                    key={num}
                    src={`/images/food/${item.seq}/pic${num}.jpeg`}
                    alt={`pic-${num}`}
                    loading="lazy" // lazy loading 적용
                  />
                ))}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export default MainFood;
