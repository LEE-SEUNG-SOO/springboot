import { axiosData, groupByRows } from "../../utils/fetchData.js";
import { createProduct, setProduct } from "./productSlice.js";

export const getProductList = (number) => async (dispatch) => {
    // setNumber({"number":number});
    const jsonData = await axiosData("/data/products.json");
    const productList = groupByRows(jsonData, number);
    dispatch(createProduct({"productList":productList, "products":jsonData}));
}

export const getFilter = (pid) => (dispatch) => {
    dispatch(setProduct({"pid":pid}));
    // dispatch(setProduct(pid));
} 