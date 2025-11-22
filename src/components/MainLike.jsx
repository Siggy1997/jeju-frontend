import { useEffect, useState } from "react";
import { bookmarkList, toggleLike } from "../apis/userAPI";
import "./MainLike.css";
function MainLike({ id }) {
  const [foodBookmark, setFoodBookmark] = useState([]);
  const [placeBookmark, setPlaceBookmark] = useState([]);
  const [favorite, setFavorite] = useState(true);

  useEffect(() => {
    (async () => {
      const responseData = await bookmarkList(id);
      setFoodBookmark(responseData.foodBookmark || []);
      setPlaceBookmark(responseData.placeBookmark || []);
    })();
  }, [id]);

  const toggleFavorite = async (itemSeq, category) => {
    await toggleLike(id, itemSeq, true, category);
    if (category === "food" || category === "dessert" ) {
      setFoodBookmark((prev) => prev.filter((item) => item.seq !== itemSeq));
    } else if (category === "place") {
      setPlaceBookmark((prev) => prev.filter((item) => item.seq !== itemSeq));
    }
  };

  return (
    <div className="bookmark-wrapper">
      {foodBookmark.map((item) => {
        const isFav = { favorite };
        return (
          <div className="bookmark-item" key={item.seq}>
            <div
              className="bookmark-item-img"
              style={{
                backgroundImage: `url(/images/food/${item.seq}/pic1.jpeg)`,
              }}
            >
              <div
                className="favorite"
                 onClick={() => toggleFavorite(item.seq, item.category)}
                style={{
                  width: "35px",
                  height: "35px",
                  backgroundImage: `url(/images/${
                    isFav ? "like.png" : "unlike.png"
                  })`,
                  backgroundSize: "cover",
                }}
              />
            </div>
            <span className="noto-sans-kr">{item.name}</span>
          </div>
        );
      })}

      {placeBookmark.map((item) => {
        const isFav = { favorite };
        return (
          <div className="bookmark-item" key={item.seq}>
            <div
              className="bookmark-item-img"
              style={{
                backgroundImage: `url(/images/place/pic${item.seq}.jpeg)`,
                backgroundPosition: "center",
              }}
            >
              <div
                className="favorite"
                onClick={() => toggleFavorite(item.seq, "place")}
                style={{
                  backgroundImage: `url(/images/${
                    isFav ? "like.png" : "unlike.png"
                  })`,
                }}
              />
            </div>
            <span className="noto-sans-kr">{item.name}</span>
          </div>
        );
      })}
    </div>
  );
}

export default MainLike;
