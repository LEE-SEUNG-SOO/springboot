/**
    전역으로 사용하는 axios 설정
    1. 쿠키 요청을 항상 true로 설정
    2. CRA Proxy 사용여부에 따라 ip 주소 변경
**/
import axios from "axios";

// 1. 쿠키 요청을 항상 true
axios.defaults.withCredentials = true;

// 2. CRA proxy 사용여부에 따라 ip 주소 변경(package.json -> proxy)
// axios.defaults.baseURL = "http://localhost:8080";

export default axios;