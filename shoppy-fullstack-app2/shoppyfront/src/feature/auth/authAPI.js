import { login, logout, setIsCart } from "./authSlice.js";
import { validateFormCheck } from "../../utils/validate.js";
import { initCartItem } from "../cart/cartSlice.js";

export const getLogin = (formData, idRef, pwdRef, setText) => (dispatch) => {
    if(validateFormCheck(idRef, pwdRef, setText)){
        if(formData.id === "test" && formData.pwd === "1234") {
            dispatch(login({"userId":formData.id})); // 비동기
            return true;
        }
    }
    return false;
}

export const getLogout = () => (dispatch) => {
    dispatch(logout());
    dispatch(initCartItem());
    return true;
}

export const setPage = () => (dispatch) => {
    dispatch(setIsCart());
}