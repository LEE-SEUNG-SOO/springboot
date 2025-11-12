import { createSlice } from '@reduxjs/toolkit';

const saveAuth = JSON.parse(localStorage.getItem("auth"));

// 전체 전역 변수
const initialState = saveAuth || {
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

        //새로고침을 위한 데이터 복사(localStorage 저장)
        localStorage.setItem("auth", JSON.stringify({
                "isLogin": true, // 이름과 값이 같을 경우 "isLogin" 생략가능 단 변수로 있을경우만!
//                    "userId" : userId // 이름과 값이 같을 경우 생략가능
                    userId
        }))
    },
    logout(state, action) {
        state.isLogin = false;
        state.isCart = false;
        // 로컬 스토리지 초기화
        localStorage.removeItem("loginInfo");
        localStorage.removeItem("auth");
        localStorage.removeItem("cart");
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