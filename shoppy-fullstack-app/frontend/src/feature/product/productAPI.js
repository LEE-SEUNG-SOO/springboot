import { axiosData, axiosGet, axiosPost, groupByRows } from "../../utils/fetchData.js";
import { createProduct, setProduct } from "./productSlice.js";

export const getProductList = (number) => async (dispatch) => {
    // setNumber({"number":number});

//    const jsonData = await axiosData("/data/products.json");
    const url = "/product/all";
    const jsonData = await axiosGet(url);

    const productList = groupByRows(jsonData, number);
    dispatch(createProduct({"productList":productList, "products":jsonData}));
}

export const getFilter = (pid) => async (dispatch) => {
    const url = "/product/detail";
    // post방식으로 보낼때 json형식으로 보내기로 했다면 파라미터도 JSON형식으로 꼭 맞추기
    const product = await axiosPost(url, { "pid" : pid });
//    dispatch(setProduct({"pid":pid}));
    dispatch(setProduct({"product":product}))
} 