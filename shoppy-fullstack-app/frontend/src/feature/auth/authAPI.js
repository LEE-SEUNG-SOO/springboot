import { login, logout, setIsCart } from "./authSlice.js";
import { validateFormCheck } from "../../utils/validate.js";
import { initCartItem } from "../cart/cartSlice.js";
import { axiosPost } from  "../../utils/fetchData.js";

export const getLogin = (formData, idRef, pwdRef, setText) => async (dispatch) => {
    let result = false;

    if(validateFormCheck(idRef, pwdRef, setText)){
        /**
        * SpringBoot - @RestController, @PostMapping("member/login")
        * formData.id, formData.pwd 파라미터 전송
        * 같은 네트워크, 다른 포트번호 사용시 에러 발생가능성 있음.
        * axiosAPI 사용
        */
        const url = "http://localhost:8080/member/login";
        const request = await axiosPost(url, formData);

        if(request) {
            dispatch(login({"userId":formData.id})); // 비동기
            result = true;
        }
    }

    return result;
}

export const getLogout = () => (dispatch) => {
    dispatch(logout());
    dispatch(initCartItem());
    return true;
}

export const setPage = () => (dispatch) => {
    dispatch(setIsCart());
}