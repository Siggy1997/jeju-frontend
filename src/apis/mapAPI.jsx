import axios from "./axiosConfig";

//지도 정보 
export const getMapList = async () => {
  const response = await axios.post("/api/map/list");
  return response.data;
};
