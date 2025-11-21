import axios from "./axiosConfig";

//음식 리스트 
export const getFoodList = async (id, category) => {
  const response = await axios.post("/api/food/list", {
    id: id,
    category : category
  });
  return response.data;
};

