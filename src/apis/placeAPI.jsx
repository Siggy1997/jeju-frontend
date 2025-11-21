import axios from "./axiosConfig";

//음식 리스트 
export const getPlaceList = async (id) => {
  const response = await axios.post("/api/place/list", {
    id: id
  });
  return response.data;
};

