import { axiosData, axiosGet, axiosPost, groupByRows } from "../../utils/fetchData.js";
import { createProduct, setProduct } from "./productSlice.js";

// 상품 반품 정보 취득
export const getReturn = async() => {
    const url = "/product/return";
    const returnData = await axiosGet(url);
    // list만 json데이터로 변경 returnData를 전부 json데이터로 변경시 에러(다른 컬럼들은 json데이터가 아니기때문)
    const list = JSON.parse(returnData.list);

    return {...returnData, "list": list};
}

// 상품 QnA 정보 취득
export const getQnA = async(pid) => {
    const url = "/product/qna";
    const qna = await axiosPost(url, { "pid" : pid });
    return qna;
}

// 상품 상세 정보 취득
export const getDetailInfo = async(pid) => {
    const url = "/product/detailInfo";
    const info = await axiosPost(url, { "pid" : pid });
    const list = JSON.parse(info.list);
    return { ...info, list : list };
}

// 상품 리스트 정보 취득
export const getProductList = (number) => async (dispatch) => {
    const url = "/product/all";
    const jsonData = await axiosGet(url);

    const productList = groupByRows(jsonData, number);

    dispatch(createProduct({"productList":productList, "products":jsonData}));
}

// 단일 상품 정보 취득
export const getFilter = (pid) => async (dispatch) => {
    const url = "/product/detail";
    // post방식으로 보낼때 json형식으로 보내기로 했다면 파라미터도 JSON형식으로 꼭 맞추기
    const product = await axiosPost(url, { "pid" : pid });
    dispatch(setProduct({"product":product}))
}