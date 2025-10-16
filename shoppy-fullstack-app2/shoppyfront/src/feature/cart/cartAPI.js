import React from 'react';
import { addCartItem, updateCartCount, updateTotalPrice, updateCartItem, removeCartItem } from './cartSlice.js';

export const addCart = (product, size) => (dispatch) => {
    // 장바구니 추가
    const cartItem = {...product, "size":size, "qty":1};
    dispatch(addCartItem({"cartItem": cartItem}));
    // 장바구니 갯수 설정
    dispatch(updateCartCount());
}

export const getTotalPrice = () => (dispatch) => {
    // 총 금액 설정
    dispatch(updateTotalPrice());
}

export const updateCart = (cid, upflag) => (dispatch) => {
    // 해당 cid의 상품에 대해 upflag의 종류에 따라 1증가 또는 1감소
    dispatch(updateCartItem({"cid":cid, "upflag":upflag}));
    // 장바구니 갯수 설정
    dispatch(updateCartCount());
    // 총 금액 설정
    dispatch(updateTotalPrice());
}

export const removeCart = (cid) => (dispatch) => {
    // 해당 cid의 상품을 장바구니에서 삭제
    dispatch(removeCartItem({"cid":cid}));
    // 장바구니 갯수 설정
    dispatch(updateCartCount());
    // 총 금액 설정
    dispatch(updateTotalPrice());
}

