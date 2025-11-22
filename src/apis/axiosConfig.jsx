import axios from "axios";

// 공통 axios 인스턴스
const axiosConfig = axios.create({
  // baseURL: "http://192.168.45.223:8082", // 기본 API URL
  // baseURL: "http://172.30.106.166:8082", // 기본 API URL
  baseURL: "https://backend.siggy.co.kr", // 기본 API URL
  // baseURL: "http://192.168.0.32:8082", // 기본 API URL
  timeout: 5000, // 5초 타임아웃 
  headers: {
    "Content-Type": "application/json",
    // 필요 시 인증 토큰 추가
    // Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default axiosConfig;