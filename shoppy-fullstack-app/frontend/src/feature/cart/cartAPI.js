import React from 'react';
import { addCartItem, setCartItem, setCartCount, updateCartCount, updateTotalPrice, updateCartItem, removeCartItem } from './cartSlice.js';
import { axiosPost } from '../../utils/fetchData.js';

export const getTotalPrice = () => (dispatch) => {
    // 총 금액 설정
    dispatch(updateTotalPrice());
}

// 장바구니 갯수 설정
export const setCount = (id) => async(dispatch) => {
    const url = "/cart/count";
    const data = {"id": id}
    const jsonData = await axiosPost(url, data);
    await dispatch(setCartCount({ "cartCount": jsonData.sumQty }));
}

export const addCart = (pid, size) => async (dispatch) => {
    // localStorage에 String타입으로 저장했으니 json타입으로 parse
    const { userId } = JSON.parse(localStorage.getItem("loginInfo"));
    // 장바구니 테이블에서 선택한 상품이 존재하는가 체크
    const result = await checkCart(pid, size, userId);

    // 장바구니 테이블에 값이 존재 할 경우 qty값 + 1
    if(result){
        const updateResult = await updateCart(result.cid, true);
    }
    // 장바구니 테이블에 존재하지 않을 경우 레코드 추가
    else {
        const url = "/cart/add";
        const cartItem = { "pid": pid, "size":size, "qty":1, "id":userId };
        const rows = await axiosPost(url, cartItem);
    }
    // 장바구니 갯수 + 1
    dispatch(updateCartCount());
}

// 장바구니 정보 취득
export const showCart = () => async(dispatch) => {
    const url = "/cart/cartList";
    const { userId } = JSON.parse(localStorage.getItem("loginInfo"));
    const cartItem = { "id" : userId };
    const cartData = await axiosPost(url, cartItem);
    dispatch(setCartItem({"cartItem": cartData}));
}

// 장바구니 테이블의 기존 항목 확인
export const checkCart = async(pid, size, id) => {
    const url = "/cart/checkCart";
    const cartItem = { "pid":pid, "size":size, "id":id };
    const cartData = await axiosPost(url, cartItem);
    return cartData;
}

export const updateCart = async (cid, upFlag) => {
    const url = "/cart/updateQty";
    const cartData = { "cid": cid, "upFlag":upFlag }
    // 장바구니 테이블의 qty값 변경 upFlag(true : 1증가, false : 1감소)
    const rows = await axiosPost(url, cartData);

    return rows;
//    // 해당 cid의 상품에 대해 upflag의 종류에 따라 1증가 또는 1감소
//    dispatch(updateCartItem({"cid":cid, "upflag":upflag}));
//    // 장바구니 갯수 설정
//    dispatch(updateCartCount());
//    // 총 금액 설정
//    dispatch(updateTotalPrice());
}

export const removeCart = (cid) => (dispatch) => {
    // 해당 cid의 상품을 장바구니에서 삭제
    dispatch(removeCartItem({"cid":cid}));
    // 장바구니 갯수 설정
    dispatch(updateCartCount());
    // 총 금액 설정
    dispatch(updateTotalPrice());
}

