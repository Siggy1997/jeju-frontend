import axios from "./axiosConfig";

// export function getLoginList() {
//   return axios.post("/api/login/list"); 
// }
//로그인 리스트 
export const getUserList = async () => {
  const response = await axios.post("/api/user/list");
  return response.data;
};


export const bookmarkList = async (id) => {
  const response = await axios.post("/api/user/bookmark", {
    id: id,
  });
  return response.data;
};



//즐겨찾기 토글
export const toggleLike = async (id, seq, isFav, category) => {
  const response = await axios.post("/api/user/toggleLike", {
    id: id,
    seq : seq,
    isFav : isFav,
    category : category
  });
  return response.data;
};


