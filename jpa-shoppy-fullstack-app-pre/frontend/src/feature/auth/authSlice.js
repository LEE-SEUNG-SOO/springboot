import { createSlice } from '@reduxjs/toolkit'

const saveAuth = JSON.parse(localStorage.getItem("auth"));

const initialState = saveAuth || {
  isLogin: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
        login(state, action) {
            state.isLogin = !state.isLogin;
            const { userId } = action.payload;
            const loginInfo = {"userId": userId};
            localStorage.setItem("loginInfo", JSON.stringify(loginInfo));

            //새로고침을 위한 데이터 복사(localStorage 저장)
            localStorage.setItem("auth", JSON.stringify({
                    "isLogin": isLogin, // 이름과 값이 같을 경우 "isLogin" 생략가능 단 변수로 있을경우만!
//                    "userId" : userId // 이름과 값이 같을 경우 생략가능
                        userId
            }))
        },
        logout(state, action) {
            state.isLogin = !state.isLogin;
            localStorage.removeItem("loginInfo");
        }
  },
})

export const { login, logout } 
    = authSlice.actions   //API 함수 또는 컴포넌트에서 dispatch(액션함수)

export default authSlice.reducer  //store  import