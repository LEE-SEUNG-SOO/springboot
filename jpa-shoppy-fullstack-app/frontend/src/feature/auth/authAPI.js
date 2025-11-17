import { login, logout, setIsCart } from "./authSlice.js";
import { validateFormCheck } from "../../utils/validate.js";
import { initCartItem } from "../cart/cartSlice.js";
import { axiosPost } from  "../../utils/fetchData.js";
import { setCount } from "../../feature/cart/cartAPI.js";
import { refreshCsrfToken } from "../csrf/manageCsrfToken.js";

export const getLogin = (formData, idRef, pwdRef, setText) => async (dispatch) => {
    let result = false;

    if(validateFormCheck(idRef, pwdRef, setText)){
        /**
        * SpringBoot - @RestController, @PostMapping("member/login")
        * formData.id, formData.pwd 파라미터 전송
        * 같은 네트워크, 다른 포트번호 사용시 에러 발생가능성 있음.
        * axiosAPI 사용
        * package.json 에 proxy를 설정했을 경우 상대경로로 설정
        */
        const url = "/member/login";
        const request = await axiosPost(url, formData);
        console.log("request : ", request);
        if(request.login) {
            dispatch(login({"userId":formData.id})); // 비동기
//            dispatch(login({"userId":formData.id , "role":request.role[0].authority})); // 비동기
            // 장바구니 카운트 갯수 설정 함수 호출
            dispatch(setCount(formData.id)); // 비동기

            result = true;
        }
    }

    return result;
}

export const getLogout = () => async(dispatch) => {
    const url = "/member/logout";
    const result = await axiosPost(url, {});
    if(result){
        // csrf 토큰 재발급
        refreshCsrfToken();
        // 로그인 정보 초기화
        dispatch(logout());
        // 장바구니 초기화
        dispatch(initCartItem());
    }
    return result;
}

export const setPage = () => (dispatch) => {
    dispatch(setIsCart());
}

export const getSignup = async (form) => {
    const formData = { ...form, email: form.emailName.concat("@", form.emailDomain)};
    console.log("formData: ", formData);

    /**
    * SpringBoot - @RestController, @PostMapping("member/login")
    * formData.id, formData.pwd 파라미터 전송
    * 같은 네트워크, 다른 포트번호 사용시 에러 발생가능성 있음.
    * axiosAPI 사용
    */
    const url = "/member/signup";
    const result = await axiosPost(url, formData);

    return result;
}

export const getDuplicateId = async (form) => {
    /**
    * SpringBoot - @RestController, @PostMapping("member/login")
    * formData.id, formData.pwd 파라미터 전송
    * 같은 네트워크, 다른 포트번호 사용시 에러 발생가능성 있음.
    * axiosAPI 사용
    */
    const data = {"id": form.id };
    const url = "/member/checkDuplicateId";
    const result = await axiosPost(url, data);

    return result;
}