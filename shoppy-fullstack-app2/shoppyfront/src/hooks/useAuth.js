import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.js';
import { CartContext } from '../context/CartContext.js';
import { useNavigate } from 'react-router-dom';

// 커스텀 훅
export function useAuth() {
    const { isLogin, setIsLogin, isCart, setIsCart, user } = useContext(AuthContext);
    // cartContext의 값을 가져오기
    const { setCartCount, setCartItems, setTotalPrice } = useContext(CartContext);
    const nav = useNavigate();
    
    // Login
    const handleLogin = (id) => {
        setIsLogin(!isLogin);
        // 로그인정보를 브라우저 > Application Tab > Local Storage에 객체를 문자열로 저장
        const loginInfo = { "userId":id, "token":"dddd" }
        localStorage.setItem("loginInfo", JSON.stringify(loginInfo)); // json데이터를 String형식으로 저장
    }

    // 초기화
    const init = () => {
        setIsLogin(false);
        setIsCart(false);
        setCartCount(0);      // 장바구니 수량
        setCartItems([]);     // 장바구니 아이템
        setTotalPrice(0);    // 장바구니 총 금액
        // localStorage.clear();
        localStorage.removeItem("loginInfo");
    }

    // Logout
    const handleLogout = () => {
        alert("로그아웃");
        init();
    }

    const checkUser = (id, pwd, idRef) => {
        if(user.id === id && user.pwd === pwd) {
            alert("로그인 성공");
            handleLogin(id);
            isCart ? nav('/checkout') : nav('/');
        } else {
            alert("로그인 실패");
            idRef.current.focus();
        }
    }

    const createUser = () => {

    }

    return { handleLogin, handleLogout, checkUser, createUser };
}

