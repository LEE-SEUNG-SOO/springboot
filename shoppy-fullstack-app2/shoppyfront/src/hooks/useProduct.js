import { useContext } from "react";
import { axiosData, groupByRows } from "../utils/fetchData.js";
import { ProductContext } from "../context/ProductContext.js";

export const useProduct = () => {
    const { productList, setProductList, number, setProduct, setImgList } = useContext(ProductContext);

    const getProductList = () => {
        const load = async () => {
            const jsonData = await axiosData("/data/products.json");
            const productList = groupByRows(jsonData, number);
            setProductList(productList);
        }
        load();
    }

    const getFilter = (pid) => {
            const [fdata] = productList.flat().filter( data => data.pid === pid ); // flat() => 2차원 배열을 1차원배열로 변경(3차원일경우 flat().flat())

            // 3차원 flat 확인
            // const kk = [ [ [1,2,3] ,[3,4,5] ], [ [6,7,8] ,[9,0,1] ] ];
            // console.log("기본", kk);
            // console.log("2차원", kk.flat());
            // console.log("3차원", kk.flat().flat());
        
            setProduct(fdata);
            setImgList(fdata.imgList);
        };

    return(
        { getProductList, getFilter }
    );
};