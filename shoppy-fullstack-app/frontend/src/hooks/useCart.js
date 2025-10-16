import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext.js';
import { cartItemsCheck, getTotalPrice } from '../utils/cart.js'
/**
 * CartContext를 제어하는 함수를 가진 커스텀 훅
 */
export function useCart() {
    // cartContext의 값을 가져오기
    const { cartCount, setCartCount, cartItems, setCartItems, totalPrice, setTotalPrice } = useContext(CartContext);

    // 컨텍스트 객체의 값을 변경하는 함수 정의
    // 장바구니 아이템 추가
    const addCart = (cartItem) => {
        setCartItems(cartItemsCheck(cartItems ,cartItem));
        setCartCount(cartCount + 1);
    }

    // 장바구니 아이템 갱신 : Cart.js (+,-)
    const updateCartItem = (cid, upflag) => {
        // 장바구니 갱신 데이터 취득
        const cartData = 
            cartItems.map( item => 
                item.cid === cid ? 
                    upflag ? { ...item, qty: item.qty + 1 }
                            :{ ...item, qty: item.qty - 1 }
                : item
            )
        // 장바구니 아이템 갱신
        setCartItems(cartData);
        // 총 금액 갱신
        setTotalPrice(getTotalPrice(cartData));
        // 장바구니 카운트 갱신
        upflag ? setCartCount(cartCount + 1) : setCartCount(cartCount - 1);
    }

    // 장바구니 아이템 삭제
    const removeCartItem = (cid) => {
        // 장바구니 갱신 데이터 취득
        // 장바구니 카운트 갱신
        const cartData = 
            cartItems.filter( item => 
                item.cid !== cid ? item : setCartCount(cartCount - item.qty)
            );

        // 장바구니 아이템 갱신
        setCartItems(cartData);
        // 총 금액 갱신
        setTotalPrice(getTotalPrice(cartData));
    }

    return { addCart, updateCartItem, removeCartItem };
}

