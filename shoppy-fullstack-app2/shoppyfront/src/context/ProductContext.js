import { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    const [productList, setProductList] = useState([]);
    const [number, setNumber] = useState(3);
    const [product, setProduct] = useState({});
    const [imgList, setImgList] = useState([]);

    return(
        <ProductContext.Provider value={{ productList, setProductList, number, setNumber, product, setProduct, imgList, setImgList }}>
            {children}
        </ProductContext.Provider>
    );
};