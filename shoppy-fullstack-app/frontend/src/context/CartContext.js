import { createContext, useState } from "react";

// CartContext 생성
export const CartContext = createContext();

// CartContext를 사용하는 컴포넌트들의 범위 지정
export const CartProvider = ({children}) => {
    const [cartCount, setCartCount] = useState(0);      // 장바구니 수량
    const [cartItems, setCartItems] = useState([]);     // 장바구니 아이템
    const [totalPrice, setTotalPrice] = useState(0);    // 장바구니 총 금액

    return (
        // 해당 컴포넌트에 cartCount 전달
        <CartContext.Provider value={{  cartCount, setCartCount, 
                                        cartItems, setCartItems,
                                        totalPrice, setTotalPrice }}>
            {children}
        </CartContext.Provider>
    );
};