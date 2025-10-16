import { createSlice } from '@reduxjs/toolkit';

// 전체 전역 변수
const initialState = {
    "isLogin": false,
    "isCart" : false,
    "id":"test",
    "pwd":1234
};

// Slice reducers 설정( 함수 설정 )
// state => initialState의 값을 가져오는 객체
// action => 컴포넌트에서 발생하는 이벤트
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
        const { userId } = action.payload;
        state.isLogin = true;
        const item = { "userId":userId , "token":"asdf"};
        localStorage.setItem("loginInfo",JSON.stringify(item));
    },
    logout(state, action) {
        state.isLogin = false;
        state.isCart = false; 
        localStorage.removeItem("loginInfo");
    },
    setIsCart(state, action) {
        state.isCart = true;
    }
  }
});

// 컴포넌트, API함수에서 reducers의 함수를 사용하기 위해 action 추가(dispatch)
export const { login, logout, setIsCart } = authSlice.actions;

// store import
export default authSlice.reducer;